import { Button, Stack, TextField } from "@mui/material";
import styles from "../Signin/SignIn.module.scss";
import { useFormik } from "formik";
import { validationSchema } from "./ValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/AuthenticationContext";
import { ROUTES } from "../../utils/routes";

const SignUp = () => {
  const navigate = useNavigate();

  const { createUser, user, loading } = useContext(UserContext);

  useEffect(() => {
    if (user.email) {
      navigate("/board");
    }
  }, []);

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
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="password"
            type="password"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            variant="standard"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />

          <Stack direction={{ xs: "column-reverse", md: "row" }} spacing={1}>
            <Button
              onClick={backToHomeHandle}
              variant="outlined"
              fullWidth
              style={{ fontSize: 16 }}
            >
              back
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{ fontSize: 16 }}
              fullWidth
            >
              Submit
            </Button>
          </Stack>
        </Stack>
        <div className={styles.external}>
          <p>Already have an account?</p>
          <Link to={ROUTES.ROUTE_SIGN_IN}>Sign in</Link>
        </div>
        {loading && <p>Loading...</p>}
      </form>
    </section>
  );
};

export default SignUp;
