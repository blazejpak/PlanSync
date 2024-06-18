import { useContext, useRef } from "react";
import styles from "./AddTask.module.scss";
import { ModalContext } from "../../context/ModalStates";
import useClickOutside from "../../components/helpers/helpers/useClickOutside";
import { FieldArray, Formik } from "formik";
import SaveButton from "../../components/helpers/ui/SaveButton";
import { Stack, TextField } from "@mui/material";
import * as yup from "yup";

const AddTask = () => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        <Formik
          initialValues={{
            task: "",
            description: "",
            subtasks: [{ subtask: "" }],
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
                />
              </Stack>

              <Stack>
                <FieldArray
                  name="subtasks"
                  render={({ push, remove }) => (
                    <div>
                      {values.subtasks.length > 0 &&
                        values.subtasks.map((subtask, index) => (
                          <div key={index}>
                            <TextField
                              label={`Subtask ${index + 1}`}
                              type="text"
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
                            />

                            <button type="button" onClick={() => remove(index)}>
                              Delete subtask
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => push({ subtask: "" })}
                      >
                        Add subtask
                      </button>
                    </div>
                  )}
                />
              </Stack>

              <SaveButton type="submit" style={{ marginTop: "1.6rem" }}>
                Add task
              </SaveButton>
            </form>
          )}
        </Formik>

        {/* <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} alignItems="center">
            <TextField
              style={{ width: "40rem" }}
              id="task"
              name="task"
              label="Task"
              type="text"
              value={formik.values.task}
              onChange={formik.handleChange}
              error={formik.touched.task && Boolean(formik.errors.task)}
              helperText={formik.touched.task && formik.errors.task}
            />

            <TextField
              style={{ width: "40rem" }}
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Stack>

          <FormikProvider value={formik}>
            <FieldArray
              name="subtasks"
              render={({ insert, push, remove }) => (
                <div>
                  {formik.values.subtasks.length > 0 &&
                    formik.values.subtasks.map((subtask, index) => (
                      <div key={index}>
                        <TextField
                          label={`Subtask ${index + 1}`}
                          type="text"
                          style={{ flex: 1 }}
                          error={Boolean(
                            formik.errors.subtasks?.[index]?.subtask &&
                              formik.touched.subtasks?.[index]?.subtask
                          )}
                          helperText={
                            formik.errors.subtasks?.[index]?.subtask &&
                            formik.touched.subtasks?.[index]?.subtask
                              ? formik.errors.subtasks[index].subtask
                              : ""
                          }
                        />

                        <button type="button" onClick={() => remove(index)}>
                          -
                        </button>
                      </div>
                    ))}
                  <button type="button" onClick={() => push({ subtask: "" })}>
                    Add subtask
                  </button>
                </div>
              )}
            />
          </FormikProvider>

          <SaveButton type="submit" style={{ marginTop: "1.6rem" }}>
            Add task
          </SaveButton>
        </form> */}
      </div>
    </div>
  );
};

export default AddTask;
