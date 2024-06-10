import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .min(3, "Must be minimum 3 characters")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email address, should something like: correct@test.com"
    )
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
