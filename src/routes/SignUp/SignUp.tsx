import { Button, Stack, TextField } from "@mui/material";
import styles from "../Signin/SignIn.module.scss";
import { useFormik } from "formik";
import { validationSchema } from "./ValidationSchema";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/AuthenticationContext";

const SignUp = () => {
  const navigate = useNavigate();

  const { createUser } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.password === values.confirmPassword) {
          await createUser(values.email, values.password);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const backToHomeHandle = () => {
    navigate("/");
  };

  return (
    <section className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h1>Sign up</h1>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <Stack direction={{ xs: "column-reverse", md: "row" }} spacing={4}>
            <Button onClick={backToHomeHandle} variant="outlined" fullWidth>
              back
            </Button>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
      <div>
        <p>Already have an account?</p>
        <p>Sign in</p>
      </div>
    </section>
  );
};

export default SignUp;
