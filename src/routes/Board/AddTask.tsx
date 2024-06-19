import { useContext, useRef, useState } from "react";
import styles from "./AddTask.module.scss";
import { ModalContext } from "../../context/ModalStates";
import useClickOutside from "../../components/helpers/helpers/useClickOutside";
import { Field, FieldArray, Formik } from "formik";
import SaveButton from "../../components/helpers/ui/SaveButton";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { DateTime } from "luxon";
import { CgClose } from "react-icons/cg";

const AddTask = () => {
  const time = DateTime.now().setLocale("en-GB").toISO().slice(0, 10);

  const modalRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [subtaskError, setSubtaskError] = useState(false);

  const { setNewTaskModal } = useContext(ModalContext);

  useClickOutside({
    ref: modalRef,
    callback: () => setNewTaskModal({ isActive: false, typeOfTask: "todo" }),
  });

  const validationSchema = yup.object({
    task: yup.string().min(3).required("Task is required."),
    description: yup.string().min(3),
    subtasks: yup.array().of(
      yup.object({
        subtask: yup.string().min(3),
      })
    ),
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        <strong>Add new task</strong>
        <Formik
          initialValues={{
            task: "",
            description: "",
            subtasks: [{ subtask: "" }],
            type: "todo",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            resetForm();
            setNewTaskModal({ isActive: false, typeOfTask: "todo" });
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
          }) => (
            <form onSubmit={handleSubmit}>
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
                              onClick={() => remove(index)}
                            >
                              <CgClose size={24} />
                            </button>
                          </div>
                        ))}
                      {subtaskError && <p>Previous subtask can't be empty</p>}
                      <button
                        className={styles.subtask__add}
                        type="button"
                        onClick={() => {
                          if (
                            !values.subtasks[values.subtasks.length - 1].subtask
                          ) {
                            setSubtaskError(true);
                          }
                          if (
                            values.subtasks[values.subtasks.length - 1].subtask
                          ) {
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

              <Stack>
                <FieldArray
                  name="types"
                  render={(helpers) => (
                    <FormControl fullWidth>
                      <InputLabel id="type">Status</InputLabel>

                      <Select
                        label="Status"
                        id="type"
                        name="type"
                        value={values.type}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                      >
                        <MenuItem value="todo">Todo</MenuItem>
                        <MenuItem value="progress">In progress</MenuItem>
                        <MenuItem value="done">Done</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
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
