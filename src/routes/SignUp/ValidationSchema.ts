import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .min(3, "Must be minimum 3 characters")
    .required("Name is required"),
  password: yup
    .string()
    .min(3, "Must be minimum 3 characters")
    .required("Name is required"),
  confirmPassword: yup
    .string()
    .min(3, "Must be minimum 3 characters")
    .required("Name is required"),
});
