import { ChangeEvent, FocusEvent } from "react";
import { Stack } from "@mui/material";
import { Field, FormikErrors } from "formik";

import { Subtask, ValuesTypes } from "./ValuesType";

import Calendar from "../dates/Calendar";

import styles from "./AddTask/AddTask.module.scss";

interface SubtasksFieldsProps {
  values: ValuesTypes;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<{
    task: string;
    description: string;
    subtasks: Subtask[];
    type: string;
    pickedRadioDate: string;
  }>>;
}

const DateFields = ({ values }: SubtasksFieldsProps) => {
  return (
    <>
      <Stack className={styles.radio__container}>
        <strong>When should the task be completed?</strong>
        <Stack className={styles.radio__selectors}>
          <label>
            <Field type="radio" name="pickedRadioDate" value="today" /> Today
          </label>
          <label>
            <Field type="radio" name="pickedRadioDate" value="pickDate" /> Pick
            date
          </label>
        </Stack>
        {values.pickedRadioDate === "pickDate" && (
          <Stack flexDirection="row">
            <Calendar />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default DateFields;
