import { ChangeEvent, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { FormikErrors, FormikTouched, FieldArray } from "formik";

import { Subtask, ValuesTypes } from "./ValuesType";

import { CgClose } from "react-icons/cg";
import styles from "./AddTask.module.scss";

interface SubtasksFieldsProps {
  values: ValuesTypes;
  errors: FormikErrors<ValuesTypes>;
  touched: FormikTouched<ValuesTypes>;
  handleChange: (e: ChangeEvent) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const SubtasksFields = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
}: SubtasksFieldsProps) => {
  const [subtaskError, setSubtaskError] = useState(false);

  return (
    <Stack>
      <FieldArray
        name="subtasks"
        render={({ push, remove }) => (
          <div className={styles.subtasks}>
            {values.subtasks.length > 0 &&
              values.subtasks.map((subtask, index) => (
                <div className={styles.subtask} key={subtask.id}>
                  <TextField
                    name={`subtasks.${index}.title`}
                    label={`Subtask ${index + 1}`}
                    type="text"
                    value={subtask.title}
                    onChange={(e) => {
                      handleChange(e);
                      setSubtaskError(false);
                    }}
                    style={{ flex: 1 }}
                    error={Boolean(
                      (
                        errors.subtasks as FormikErrors<Subtask>[] | undefined
                      )?.[index]?.title &&
                        (
                          touched.subtasks as
                            | FormikTouched<Subtask>[]
                            | undefined
                        )?.[index]?.title
                    )}
                    helperText={
                      (
                        errors.subtasks as FormikErrors<Subtask>[] | undefined
                      )?.[index]?.title &&
                      (
                        touched.subtasks as FormikTouched<Subtask>[] | undefined
                      )?.[index]?.title
                        ? (errors.subtasks as FormikErrors<Subtask>[])[index]
                            ?.title
                        : ""
                    }
                    InputLabelProps={{
                      style: {
                        fontSize: 14,
                        width: "8rem",
                        backgroundColor: "white",
                      },
                    }}
                    inputProps={{ style: { fontSize: 16 } }}
                    required
                  />

                  <button
                    className={styles.subtask__remove}
                    type="button"
                    onClick={() => {
                      if (values.subtasks.length === 1) {
                        if (values.subtasks[0].title) {
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
              <p className={styles.error}>Previous subtask can't be empty</p>
            )}
            <button
              className={styles.subtask__add}
              type="button"
              onClick={() => {
                if (!values.subtasks[values.subtasks.length - 1].title) {
                  setSubtaskError(true);
                } else {
                  push({ title: "", isDone: false, id: 0 });
                }
              }}
            >
              Add subtask
            </button>
          </div>
        )}
      />
    </Stack>
  );
};

export default SubtasksFields;
