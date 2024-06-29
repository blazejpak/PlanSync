import { useContext, useRef } from "react";

import { Formik } from "formik";

import { ModalContext } from "../../context/ModalStates";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useClickOutside from "../../components/helpers/helpers/useClickOutside";
import {
  allData,
  dataFromAllDays,
  getRangeDate,
} from "../../store/reducers/data";
import { UserContext } from "../../context/AuthenticationContext";

import SaveButton from "../../components/helpers/ui/SaveButton";

import styles from "./AddTask.module.scss";
import { validationSchema } from "./AddTaskValidationSchema";
import TaskFields from "./AddTask/TaskFields";
import SubtasksFields from "./AddTask/SubtasksFields";
import DateFields from "./AddTask/DateFields";

const AddTask = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { setNewTaskModal, newTaskModal } = useContext(ModalContext);
  const { user } = useContext(UserContext);

  const { typeOfTask } = newTaskModal;
  const data = useAppSelector(dataFromAllDays);
  const rangeData = useAppSelector(getRangeDate);
  const dispatch = useAppDispatch();

  useClickOutside({
    ref: modalRef,
    callback: () => setNewTaskModal({ isActive: false, typeOfTask: "todo" }),
  });

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
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
            resetForm();
            setNewTaskModal({ isActive: false, typeOfTask: "todo" });

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
                    typeOfTask: values.type,
                    userId: user?.uid,
                    subtasksDone: false,
                    date: rangeData.from,
                  },
                ])
              );
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
      </div>
    </div>
  );
};

export default AddTask;
