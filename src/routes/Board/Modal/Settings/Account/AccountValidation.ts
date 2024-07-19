import * as yup from "yup";

export const validationUsernameSchema = yup.object({
  username: yup.string().min(3).required("Task is required."),
});

export const validationPhoneSchema = yup.object({
  phoneNumber: yup
    .string()
    .matches(/^[0-9]{9}/)
    .length(9)
    .required("Phone number is required"),
});
