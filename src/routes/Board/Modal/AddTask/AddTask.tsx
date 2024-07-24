import { Formik, FormikHelpers } from "formik";

import { useSafeModalContext } from "../../../../context/ModalStates";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectRangeDate } from "../../../../store/reducers/calendar";
import { useSafeUserContext } from "../../../../context/AuthenticationContext";
import { addTask } from "../../../../store/reducers/tasks";

import SaveButton from "../../../../components/button/SaveButton";
import { validationSchema } from "./AddTaskValidationSchema";
import TaskFields from "../TaskFields";
import SubtasksFields from "../SubtasksFields";
import DateFields from "../DateFields";
import Overlay from "../Overlay";

import { ValuesTypes } from "../ValuesType";
import styles from "./AddTask.module.scss";

const AddTask = () => {
  const { user } = useSafeUserContext();
  const { taskModal, closeModal } = useSafeModalContext();
  const typeOfTask = taskModal.prop as string;

  const rangeData = useAppSelector(selectRangeDate);
  const dispatch = useAppDispatch();

  const initialValues: ValuesTypes = {
    task: "",
    description: "",
    subtasks: [{ title: "", isDone: false, id: Math.random() }],
    type: typeOfTask,
    pickedRadioDate: "today",
  };

  const submitAddTask = (
    values: ValuesTypes,
    { setSubmitting, resetForm }: FormikHelpers<ValuesTypes>
  ) => {
    if (values.task && user) {
      const filteredSubtasks = values.subtasks.filter(
        (subtask) => subtask.title
      );

      dispatch(
        addTask({
          task: values.task,
          description: values.description || "",
          rangeDateFrom: rangeData.from,
          rangeDateTo: rangeData.to,
          subtasks: filteredSubtasks,
          typeOfTask: typeOfTask,
          userId: user?.uid,
          subtasksDone: false,
          date: rangeData.from,
        })
      );

      resetForm();
      closeModal();
    }
  };

  return (
    <Overlay>
      <strong className={styles.modal__heading}>Add new task</strong>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitAddTask}
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
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />

            <SaveButton type="submit" style={{ marginTop: "1.6rem" }}>
              Add task
            </SaveButton>
          </form>
        )}
      </Formik>
    </Overlay>
  );
};

export default AddTask;
