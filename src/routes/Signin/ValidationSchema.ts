import * as yup from "yup";

export const validationSchema = yup.object({
  login: yup
    .string()
    .min(3, "Must be minimum 3 characters")
    .required("Name is required"),
  password: yup
    .string()
    .min(3, "Must be minimum 3 characters")
    .required("Name is required"),
});
