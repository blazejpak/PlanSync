import { useContext, useRef, useState } from "react";
import styles from "./AddTask.module.scss";
import { ModalContext } from "../../context/ModalStates";
import useClickOutside from "../../components/helpers/helpers/useClickOutside";
import { Field, FieldArray, Formik } from "formik";
import SaveButton from "../../components/helpers/ui/SaveButton";
import { Stack, TextField } from "@mui/material";
import * as yup from "yup";
import { DateTime, Interval } from "luxon";
import { CgClose } from "react-icons/cg";
import Calendar from "../../components/helpers/ui/Calendar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getData } from "../../store/reducers/data";

const AddTask = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [subtaskError, setSubtaskError] = useState(false);

  const { setNewTaskModal, newTaskModal } = useContext(ModalContext);
  const { typeOfTask } = newTaskModal;
  const data = useAppSelector(getData);
  const dispatch = useAppDispatch();

  useClickOutside({
    ref: modalRef,
    callback: () => setNewTaskModal({ isActive: false, typeOfTask: "todo" }),
  });

  const startMonth = DateTime.now().setLocale("en-GB");

  // const intervals = Interval.fromDateTimes(startMonth, DateTime.fromISO(date))
  //   .splitBy({ day: 1 })
  //   .map((date: Interval) => date.start?.toISODate());

  const validationSchema = yup.object({
    task: yup.string().min(3).required("Task is required."),
    description: yup.string().min(3),
    subtasks: yup.array().of(
      yup.object({
        subtask: yup.string().min(3),
      })
    ),
    type: yup.string(),
    pickedRadioDate: yup.string(),
  });

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        <strong className={styles.modal__heading}>Add new task</strong>
        <Formik
          initialValues={{
            task: "",
            description: "",
            subtasks: [{ subtask: "" }],
            type: typeOfTask,
            pickedRadioDate: "today",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            resetForm();
            setNewTaskModal({ isActive: false, typeOfTask: "todo" });

            if (values.task) {
              // dispatch(sendData([...data,{}]))
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
              <Stack spacing={2} alignItems="center">
                <TextField
                  style={{ width: "40rem" }}
                  id="task"
                  name="task"
                  label="Task"
                  type="text"
                  value={values.task}
                  onChange={handleChange}
                  error={touched.task && Boolean(errors.task)}
                  helperText={touched.task && errors.task}
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                      width: "4.5rem",
                      backgroundColor: "white",
                    },
                  }}
                  required
                />

                <TextField
                  style={{ width: "40rem" }}
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{
                    style: {
                      fontSize: 14,
                      width: "8rem",
                      backgroundColor: "white",
                    },
                  }}
                />
              </Stack>

              <Stack>
                <FieldArray
                  name="subtasks"
                  render={({ push, remove }) => (
                    <div className={styles.subtasks}>
                      {values.subtasks.length > 0 &&
                        values.subtasks.map((subtask, index) => (
                          <div className={styles.subtask} key={index}>
                            <TextField
                              name={`subtasks.${index}.subtask`}
                              label={`Subtask ${index + 1}`}
                              type="text"
                              value={subtask.subtask}
                              onChange={(e) => {
                                handleChange(e);
                                setSubtaskError(false);
                              }}
                              style={{ flex: 1 }}
                              error={Boolean(
                                errors.subtasks?.[index]?.subtask &&
                                  touched.subtasks?.[index]?.subtask
                              )}
                              helperText={
                                errors.subtasks?.[index]?.subtask &&
                                touched.subtasks?.[index]?.subtask
                                  ? errors.subtasks[index].subtask
                                  : ""
                              }
                              InputLabelProps={{
                                style: {
                                  fontSize: 14,
                                  width: "8rem",
                                  backgroundColor: "white",
                                },
                              }}
                            />

                            <button
                              className={styles.subtask__remove}
                              type="button"
                              onClick={() => {
                                if (values.subtasks.length === 1) {
                                  if (values.subtasks[0].subtask) {
                                    setFieldValue("subtasks[0].subtask", "");
                                  }
                                  return;
                                }
                                remove(index);
                              }}
                            >
                              <CgClose size={24} />
                            </button>
                          </div>
                        ))}
                      {subtaskError && (
                        <p className={styles.error}>
                          Previous subtask can't be empty
                        </p>
                      )}
                      <button
                        className={styles.subtask__add}
                        type="button"
                        onClick={() => {
                          console.log(values);
                          if (
                            !values.subtasks[values.subtasks.length - 1].subtask
                          ) {
                            setSubtaskError(true);
                          } else {
                            push({ subtask: "" });
                          }
                        }}
                      >
                        Add subtask
                      </button>
                    </div>
                  )}
                />
              </Stack>

              <select
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
                className={styles.select}
              >
                <option value="todo">Todo</option>
                <option value="progress">In progress</option>
                <option value="done">Done</option>
              </select>

              <Stack className={styles.radio__container}>
                <strong>When should the task be completed?</strong>
                <Stack className={styles.radio__selectors}>
                  <label>
                    <Field type="radio" name="pickedRadioDate" value="today" />{" "}
                    Today
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="pickedRadioDate"
                      value="pickDate"
                    />{" "}
                    Pick date
                  </label>
                </Stack>
                {values.pickedRadioDate === "pickDate" && (
                  <Stack flexDirection="row">
                    <Calendar />
                  </Stack>
                )}
              </Stack>

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
