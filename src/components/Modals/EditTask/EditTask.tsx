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
import { selectAllData, updateTask } from "../../../store/reducers/tasks";
import TypeTaskSelect from "../TypeTaskSelect";
import CategoryPicker from "../CategoryPicker";

import TaskFields from "../TaskFields";
import SubtasksFields from "../SubtasksFields";
import DateFields from "../DateFields";
import SaveButton from "../../button/SaveButton";

import styles from "../AddTask/AddTask.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { ROUTES } from "../../../types/routes";

const EditTask = () => {
  const data = useAppSelector(selectAllData);
  const rangeData = useAppSelector(selectRangeDate);
  const { closeModal } = useSafeModalContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useSafeUserContext();
  const { boardId, taskId } = useParams<{ boardId: string; taskId: string }>();
  const task = data.find((item) => item.id === taskId)!;
  useEffect(() => {
    if (task) {
      dispatch(
        pickRangeDate({
          from: task.rangeDateFrom || DateTime.now().toISODate(),
          to: task.rangeDateTo || DateTime.now().toISODate(),
        })
      );
    }
  }, [task]);

  if (!taskId) {
    return <div>Task ID is missing in the URL.</div>;
  }

  if (!boardId) {
    return <div>Date is missing in the URL.</div>;
  }

  if (!task) {
    return <div>Task not found.</div>;
  }

  if (!data || data.length === 0) {
    return <div>Loading tasks...</div>;
  }

  const typeOfCalendar =
    task?.rangeDateTo > task?.rangeDateFrom ? "pickDate" : "today";

  const initialValue = {
    category: task.category,
    description: task.description,
    pickedRadioDate: typeOfCalendar,
    subtasks: task.subtasks,
    type: task.typeOfTask,
    task: task.task,
  };

  const saveTask = (
    values: ValuesTypes,
    { setSubmitting, resetForm }: FormikHelpers<ValuesTypes>
  ) => {
    const filteredSubtasks = values.subtasks.filter((subtask) => subtask.title);

    const updatedTask = {
      id: task.id,
      task: values.task,
      category: values.category,
      description: values.description || "",
      rangeDateFrom: rangeData.from,
      rangeDateTo: rangeData.to,
      subtasks: filteredSubtasks,
      typeOfTask: values.type,
      userId: user?.uid,
      subtasksDone: task.subtasksDone,
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
                onClick={() => navigate(ROUTES.ROUTE_TASK(boardId, taskId))}
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
