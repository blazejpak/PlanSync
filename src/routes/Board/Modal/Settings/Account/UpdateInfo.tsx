import { Formik } from "formik";
import SaveButton from "../../../../../components/button/SaveButton";
import Indentation from "../Indentation";

import styles from "./UpdateInfo.module.scss";
import { validationUsernameSchema } from "./AccountValidation";
import { TextField } from "@mui/material";
import { useSafeSettingsContext } from "../../../../../context/Settings";

const UpdateUsername = () => {
  const { pickedTheme } = useSafeSettingsContext();

  const initialUsernameSchema = { username: "" };
  const submitUsername = (e: any) => {
    e.preventDefault();
  };

  const initialPhoneSchema = { phoneNumber: "" };
  const submitPhoneNumber = (e: any) => {
    e.preventDefault();
  };

  return (
    <Indentation>
      <div className={styles.forms}>
        <Formik
          onSubmit={submitPhoneNumber}
          initialValues={initialUsernameSchema}
          validationSchema={validationUsernameSchema}
          className={styles.content}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className={styles.input__box}>
              <TextField
                id="username"
                name="username"
                label="Update your username"
                type="text"
                variant="standard"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                InputLabelProps={{
                  style: {
                    color: pickedTheme === "dark" ? "white" : "black",
                    fontSize: 14,
                    width: "20rem",
                  },
                }}
                InputProps={{
                  style: {
                    color: pickedTheme === "dark" ? "white" : "black",
                    fontSize: 16,
                    width: "20rem",
                  },
                }}
              />
              <SaveButton style={{ width: "10rem" }} type="submit">
                Save
              </SaveButton>
            </form>
          )}
        </Formik>

        <Formik
          onSubmit={submitUsername}
          initialValues={initialPhoneSchema}
          validationSchema={validationUsernameSchema}
          className={styles.content}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className={styles.input__box}>
              <TextField
                id="username"
                name="username"
                label="Update your phone number"
                type="text"
                variant="standard"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                InputLabelProps={{
                  style: {
                    color: pickedTheme === "dark" ? "white" : "black",
                    fontSize: 14,
                    width: "20rem",
                  },
                }}
                InputProps={{
                  style: {
                    color: pickedTheme === "dark" ? "white" : "black",
                    fontSize: 16,
                    width: "20rem",
                  },
                }}
              />
              <SaveButton style={{ width: "10rem" }} type="submit">
                Save
              </SaveButton>
            </form>
          )}
        </Formik>
      </div>
    </Indentation>
  );
};

export default UpdateUsername;
