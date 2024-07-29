import { Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { RotatingLines } from "react-loader-spinner";

import Indentation from "../Indentation";
import { useSafeUserContext } from "../../../../../context/AuthenticationContext";
import { validationSchema } from "./ChangePasswordValidation";

import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
  const { loading, error, UpdateUserPassword } = useSafeUserContext();

  const formik = useFormik({
    initialValues: {
      prevPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      UpdateUserPassword(values.prevPassword, values.password);
    },
  });

  return (
    <Indentation>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <strong>Change your password:</strong>
        <Stack spacing={2}>
          <TextField
            fullWidth
            id="prevPassword"
            name="prevPassword"
            label="Previous password"
            type="password"
            variant="standard"
            value={formik.values.prevPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.prevPassword && Boolean(formik.errors.prevPassword)
            }
            helperText={
              formik.touched.prevPassword && formik.errors.prevPassword
            }
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

          <Button
            type="submit"
            variant="contained"
            style={{ fontSize: 16 }}
            fullWidth
          >
            Submit
          </Button>
        </Stack>

        {error && <p className={styles.error}>{error}</p>}

        {loading && (
          <div className={styles.loading}>
            <RotatingLines strokeColor="#4455cf" />
          </div>
        )}
      </form>
    </Indentation>
  );
};

export default ChangePassword;
