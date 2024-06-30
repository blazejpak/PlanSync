import { useContext } from "react";

import { Formik } from "formik";

import { ModalContext } from "../../../../context/ModalStates";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import {
  allData,
  dataFromAllDays,
  getRangeDate,
} from "../../../../store/reducers/data";
import { UserContext } from "../../../../context/AuthenticationContext";

import SaveButton from "../../../../components/helpers/ui/SaveButton";

import styles from "./AddTask.module.scss";
import { validationSchema } from "../../AddTaskValidationSchema";
import TaskFields from "./TaskFields";
import SubtasksFields from "./SubtasksFields";
import DateFields from "./DateFields";
import Overlay from "../Overlay";

const AddTask = () => {
  const { user } = useContext(UserContext);
  const { typeTaskModal, setTypeTaskModal, setIsModalActive } =
    useContext(ModalContext);
  const typeOfTask = typeTaskModal.prop as string;

  const data = useAppSelector(dataFromAllDays);
  const rangeData = useAppSelector(getRangeDate);
  const dispatch = useAppDispatch();

  return (
    <Overlay>
      <strong className={styles.modal__heading}>Add new task</strong>
      <Formik
        initialValues={{
          task: "",
          description: "",
          subtasks: [{ title: "", isDone: false, id: Math.random() }],
          type: typeOfTask,
          pickedRadioDate: "today",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (values.task && user) {
            const filteredSubtasks = values.subtasks.filter(
              (subtask) => subtask.title
            );

            dispatch(
              allData([
                ...data,
                {
                  uid: Math.random().toString(),
                  task: values.task,
                  description: values.description || "",
                  rangeDateFrom: rangeData.from,
                  rangeDateTo: rangeData.to,
                  subtasks: filteredSubtasks,
                  typeOfTask: typeOfTask,
                  userId: user?.uid,
                  subtasksDone: false,
                  date: rangeData.from,
                },
              ])
            );

            resetForm();
            setTypeTaskModal({ type: null, prop: null });
            setIsModalActive(false);
          }
        }}
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
