import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { TextField } from "@mui/material";

import SaveButton from "../../../button/SaveButton";

import {
  validationPhoneSchema,
  validationFullNameSchema,
} from "./AccountValidation";
import { useSafeSettingsContext } from "../../../../context/Settings";
import { useSafeUserContext } from "../../../../context/AuthenticationContext";

import Indentation from "../Indentation";
import styles from "./UpdateData.module.scss";

const UpdateData = () => {
  const { pickedTheme } = useSafeSettingsContext();
  const { currentUserData, UpdateUserData, isSucceed, error } =
    useSafeUserContext();

  const [isFullNameButtonClicked, setIsFullNameButtonClicked] = useState(false);
  const [isPhoneNumberButtonClicked, setIsPhoneNumberButtonClicked] =
    useState(false);

  const initialFullNameSchema = { fullName: "" };

  const submitFullName = (
    values: { fullName: string },
    formikHelpers: FormikHelpers<{ fullName: string }>
  ) => {
    setIsFullNameButtonClicked(true);
    UpdateUserData({
      ...currentUserData,
      fullName: values.fullName.toLocaleLowerCase(),
    });
    formikHelpers.resetForm();
    setTimeout(() => {
      setIsFullNameButtonClicked(false);
    }, 1000);
  };

  const initialPhoneSchema = { phoneNumber: "" };

  const submitPhoneNumber = (
    values: { phoneNumber: string },
    formikHelpers: FormikHelpers<{ phoneNumber: string }>
  ) => {
    setIsPhoneNumberButtonClicked(true);
    UpdateUserData({ ...currentUserData, phoneNumber: values.phoneNumber });
    formikHelpers.resetForm();
    setTimeout(() => {
      setIsPhoneNumberButtonClicked(false);
    }, 1000);
  };

  return (
    <Indentation>
      <div className={styles.forms}>
        <Formik
          onSubmit={submitFullName}
          initialValues={initialFullNameSchema}
          validationSchema={validationFullNameSchema}
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
                id="fullName"
                name="fullName"
                label="Update your full name"
                type="text"
                variant="standard"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
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
              <SaveButton
                isSucceed={isSucceed && isFullNameButtonClicked}
                style={{ width: "10rem" }}
                type="submit"
              >
                {isSucceed && isFullNameButtonClicked ? "Changed" : "Save"}
              </SaveButton>
            </form>
          )}
        </Formik>

        <Formik
          onSubmit={submitPhoneNumber}
          initialValues={initialPhoneSchema}
          validationSchema={validationPhoneSchema}
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
                id="phoneNumber"
                name="phoneNumber"
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
              <SaveButton
                isSucceed={isSucceed && isPhoneNumberButtonClicked}
                style={{ width: "10rem" }}
                type="submit"
              >
                {isSucceed && isPhoneNumberButtonClicked ? "Changed" : "Save"}
              </SaveButton>
            </form>
          )}
        </Formik>
      </div>
    </Indentation>
  );
};

export default UpdateData;
