import { ChangeEvent } from "react";
import { Stack, TextField } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { ValuesTypes } from "./ValuesType";

interface TaskFieldsProps {
  values: ValuesTypes;
  errors: FormikErrors<{ task: string; description: string }>;
  touched: FormikTouched<{ task: string; description: string }>;
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
);

export default TaskFields;
