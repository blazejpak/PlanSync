import * as yup from "yup";

export const validationSchema = yup.object({
  task: yup.string().min(3).required("Task is required."),
  description: yup.string().min(3),
  subtasks: yup
    .array()
    .of(
      yup.object({
        title: yup.string().min(3),
        isDone: yup.boolean(),
        id: yup.number(),
      })
    )
    .required("Subtask is required"),
  type: yup.string(),
  pickedRadioDate: yup.string(),
});
