import { ChangeEvent, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { FormikErrors, FormikTouched, FieldArray } from "formik";

import { CgClose } from "react-icons/cg";

import styles from "./AddTask.module.scss";
import { ValuesTypes } from "./ValuesType";

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
                <div className={styles.subtask} key={index}>
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
                      errors.subtasks?.[index] && touched.subtasks?.[index]
                    )}
                    helperText={
                      errors.subtasks &&
                      errors.subtasks[index] &&
                      errors.subtasks[index]?.title &&
                      touched.subtasks &&
                      touched.subtasks[index] &&
                      touched.subtasks[index].title
                        ? errors.subtasks[index]?.title
                        : ""
                    }
                    InputLabelProps={{
                      style: {
                        fontSize: 14,
                        width: "8rem",
                        backgroundColor: "white",
                      },
                    }}
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
                console.log(values);
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
