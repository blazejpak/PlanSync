import { Button, Stack, TextField } from "@mui/material";
import styles from "./SignIn.module.scss";
import { useFormik } from "formik";
import { validationSchema } from "./ValidationSchema";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h1>Sign in</h1>
        <Stack spacing={4}>
          <TextField
            fullWidth
            id="login"
            name="login"
            label="login"
            type="text"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
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
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Button type="submit" variant="contained" fullWidth>
              Submit Order
            </Button>
            <Button type="submit" variant="outlined" fullWidth>
              back
            </Button>
          </Stack>
        </Stack>
      </form>
    </section>
  );
};

export default SignIn;
