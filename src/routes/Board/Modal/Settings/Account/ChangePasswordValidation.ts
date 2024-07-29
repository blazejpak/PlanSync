import * as yup from "yup";

export const validationSchema = yup.object({
  prevPassword: yup.string(),
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
