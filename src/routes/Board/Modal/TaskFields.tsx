import { ChangeEvent } from "react";
import { Stack, TextField } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { ValuesTypes } from "./ValuesType";
import styles from "./TaskFields.module.scss";

interface TaskFieldsProps {
  values: ValuesTypes;
  errors: FormikErrors<ValuesTypes>;
  touched: FormikTouched<ValuesTypes>;
  handleChange: (e: ChangeEvent) => void;
}

const TaskFields = ({
  values,
  errors,
  touched,
  handleChange,
}: TaskFieldsProps) => (
  <Stack spacing={2} alignItems="center">
    <TextField
      className={styles.input}
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
      className={styles.input}
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
);

export default TaskFields;
