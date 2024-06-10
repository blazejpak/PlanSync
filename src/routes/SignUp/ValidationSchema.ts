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
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], 'Must match "password" field value'),
});
