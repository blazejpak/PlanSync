import { Button, Stack, TextField } from "@mui/material";
import styles from "../Signin/SignIn.module.scss";
import { useFormik } from "formik";
import { validationSchema } from "./ValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSafeUserContext } from "../../context/AuthenticationContext";
import { ROUTES } from "../../utils/routes";
import { RotatingLines } from "react-loader-spinner";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const navigate = useNavigate();

  const { SignUp, user, loading, GoogleLogin, error } = useSafeUserContext();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.ROUTE_BOARD);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      SignUp({ email: values.email, password: values.password });
    },
  });

  const backToHomeHandle = () => {
    navigate("/");
  };

  const googleSignIn = () => {
    GoogleLogin();
    navigate(ROUTES.ROUTE_BOARD);
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
            label="confirm password"
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

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.external}>
          <p>Already have an account?</p>
          <Link to={ROUTES.ROUTE_SIGN_IN}>Sign in</Link>
        </div>

        <div className={styles.google}>
          <button onClick={googleSignIn} type="button">
            Sign in with Google
          </button>
          <FcGoogle size={24} />
        </div>

        {loading && (
          <div className={styles.loading}>
            <RotatingLines strokeColor="#4455cf" />
          </div>
        )}
      </form>
    </section>
  );
};

export default SignUp;
