import { Button, Stack, TextField } from "@mui/material";
import styles from "./SignIn.module.scss";
import { useFormik } from "formik";
import { validationSchema } from "./ValidationSchema";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/AuthenticationContext";
import { useContext } from "react";

import { auth } from "../../utils/firebase";

const SignIn = () => {
  const navigate = useNavigate();

  const { signIn, logout } = useContext(UserContext);

  console.log(auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signIn(values.email, values.password);
        navigate("/");
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
        <h1>Sign in</h1>
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
    </section>
  );
};

export default SignIn;
