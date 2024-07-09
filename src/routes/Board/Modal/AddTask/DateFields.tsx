import { ChangeEvent, FocusEvent } from "react";
import { Stack } from "@mui/material";
import { Field } from "formik";

import styles from "./AddTask.module.scss";

import { ValuesTypes } from "./ValuesType";
import Calendar from "../../../../components/dates/Calendar";

interface SubtasksFieldsProps {
  values: ValuesTypes;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
}

const DateFields = ({
  values,
  handleChange,
  handleBlur,
}: SubtasksFieldsProps) => {
  return (
    <>
      <select
        name="type"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.type}
        className={styles.select}
      >
        <option value="todo">Todo</option>
        <option value="progress">In progress</option>
        <option value="done">Done</option>
      </select>

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
