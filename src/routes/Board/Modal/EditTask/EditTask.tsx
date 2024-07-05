import { useContext, useEffect } from "react";

import { Formik, FormikHelpers } from "formik";

import { ModalContext } from "../../../../context/ModalStates";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import {
  allData,
  dataFromAllDays,
  getRangeDate,
  pickRangeDate,
} from "../../../../store/reducers/data";
import { UserContext } from "../../../../context/AuthenticationContext";

import SaveButton from "../../../../components/helpers/ui/SaveButton";

import styles from "../AddTask/AddTask.module.scss";
import { validationSchema } from "../../AddTaskValidationSchema";
import Overlay from "../Overlay";
import TaskFields from "../AddTask/TaskFields";
import SubtasksFields from "../AddTask/SubtasksFields";
import DateFields from "../AddTask/DateFields";
import { ValuesTypes } from "../AddTask/ValuesType";

const EditTask = () => {
  const { typeTaskModal, setTypeTaskModal, activeTask, setIsModalActive } =
    useContext(ModalContext);
  const { user } = useContext(UserContext);

  const data = useAppSelector(dataFromAllDays);
  const rangeData = useAppSelector(getRangeDate);
  const dispatch = useAppDispatch();

  if (!activeTask || !user) return null;

  useEffect(() => {
    dispatch(
      pickRangeDate({
        from: activeTask.rangeDateFrom,
        to: activeTask.rangeDateTo,
      })
    );
  }, []);

  const typeOfCalendar =
    activeTask?.rangeDateTo > activeTask?.rangeDateFrom ? "pickDate" : "today";

  const initialValue = {
    task: activeTask.task,
    description: activeTask.description,
    subtasks: activeTask.subtasks,
    type: activeTask.typeOfTask,
    pickedRadioDate: typeOfCalendar,
  };

  const saveTask = (
    values: ValuesTypes,
    { setSubmitting, resetForm }: FormikHelpers<ValuesTypes>
  ) => {
    const filteredSubtasks = values.subtasks.filter((subtask) => subtask.title);

    const editedTask = data.map((task) => {
      if (task.uid === activeTask.uid) {
        task = {
          uid: Math.random().toString(),
          task: values.task,
          description: values.description || "",
          rangeDateFrom: rangeData.from,
          rangeDateTo: rangeData.to,
          subtasks: filteredSubtasks,
          typeOfTask: values.type,
          userId: user?.uid,
          subtasksDone: activeTask.subtasksDone,
          date: rangeData.from,
        };
      }
      return task;
    });

    dispatch(allData(editedTask));

    resetForm();
    setTypeTaskModal({ type: null, prop: null });
    setIsModalActive(false);
  };

  if (typeTaskModal.type !== "edit") return null;

  return (
    <Overlay>
      <strong className={styles.modal__heading}>Edit task</strong>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={saveTask}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <TaskFields
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
            />

            <SubtasksFields
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />

            <DateFields
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />

            <div>
              <SaveButton type="submit" style={{ marginTop: "1.6rem" }}>
                Save
              </SaveButton>
              <SaveButton type="button" style={{ marginTop: "1.6rem" }}>
                Cancel
              </SaveButton>
            </div>
          </form>
        )}
      </Formik>
    </Overlay>
  );
};

export default EditTask;
