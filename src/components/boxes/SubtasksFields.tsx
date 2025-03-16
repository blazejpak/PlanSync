import { ChangeEvent, useState } from "react";
import { Stack } from "@mui/material";
import { FormikErrors, FormikTouched, FieldArray } from "formik";

import { ValuesTypes } from "./ValuesType";

import { CgClose } from "react-icons/cg";
import styles from "./SubtasksFields.module.scss";

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
  handleChange,
  setFieldValue,
}: SubtasksFieldsProps) => {
  const [subtaskError, setSubtaskError] = useState(false);

  return (
    <Stack gap={1}>
      <label>Subtasks*</label>
      <FieldArray
        name="subtasks"
        render={({ push, remove }) => (
          <div className={styles.subtasks}>
            {values.subtasks.length > 0 &&
              values.subtasks.map((subtask, index) => (
                <div key={subtask.id} className={styles.subtask}>
                  <input
                    type="text"
                    name={`subtasks.${index}.title`}
                    placeholder={`Subtask ${index + 1}`}
                    value={subtask.title}
                    required
                    onChange={(e) => {
                      handleChange(e);
                      setSubtaskError(false);
                    }}
                    className={styles.input}
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
                    <CgClose size={24} className={styles.icon} />
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
