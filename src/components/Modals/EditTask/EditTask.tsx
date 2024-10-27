import { useEffect } from "react";
import { Formik, FormikHelpers } from "formik";

import { validationSchema } from "../AddTask/AddTaskValidationSchema";
import { ValuesTypes } from "../ValuesType";
import { useSafeModalContext } from "../../../context/ModalStates";
import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  pickRangeDate,
  selectRangeDate,
} from "../../../store/reducers/calendar";
import { updateTask } from "../../../store/reducers/tasks";
import TypeTaskSelect from "../TypeTaskSelect";
import CategoryPicker from "../CategoryPicker";

import Overlay from "../Overlay";
import TaskFields from "../TaskFields";
import SubtasksFields from "../SubtasksFields";
import DateFields from "../DateFields";
import SaveButton from "../../button/SaveButton";

import styles from "../AddTask/AddTask.module.scss";

const EditTask = () => {
  const { taskModal, closeModal } = useSafeModalContext();
  const activeTask = taskModal.activeTaskData;
  const { user } = useSafeUserContext();

  const rangeData = useAppSelector(selectRangeDate);
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
    category: activeTask.category,
    description: activeTask.description,
    pickedRadioDate: typeOfCalendar,
    subtasks: activeTask.subtasks,
    type: activeTask.typeOfTask,
    task: activeTask.task,
  };

  const saveTask = (
    values: ValuesTypes,
    { setSubmitting, resetForm }: FormikHelpers<ValuesTypes>
  ) => {
    const filteredSubtasks = values.subtasks.filter((subtask) => subtask.title);

    const updatedTask = {
      id: activeTask.id,
      task: values.task,
      category: values.category,
      description: values.description || "",
      rangeDateFrom: rangeData.from,
      rangeDateTo: rangeData.to,
      subtasks: filteredSubtasks,
      typeOfTask: values.type,
      userId: user?.uid,
      subtasksDone: activeTask.subtasksDone,
      date: rangeData.from,
    };

    dispatch(updateTask(updatedTask));

    resetForm();
    closeModal();
  };

  return (
    <section>
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
            <TaskFields handleChange={handleChange} />

            <SubtasksFields
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />

            <TypeTaskSelect
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />

            <CategoryPicker
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />

            <DateFields
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />

            <div>
              <SaveButton
                isSucceed={null}
                type="submit"
                style={{ marginTop: "1.6rem" }}
              >
                Save
              </SaveButton>
              <SaveButton
                isSucceed={null}
                type="button"
                style={{ marginTop: "1.6rem" }}
              >
                Cancel
              </SaveButton>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default EditTask;
