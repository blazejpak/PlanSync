import { ChangeEvent, FocusEvent } from "react";
import { Stack } from "@mui/material";
import { Field, FormikErrors } from "formik";
import Select from "react-select";

import styles from "./AddTask/AddTask.module.scss";
import { Subtask, ValuesTypes } from "./ValuesType";
import Calendar from "../../../components/dates/Calendar";

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

const options = [
  { value: "todo", label: "Todo" },
  { value: "progress", label: "In progress" },
  { value: "done", label: "Done" },
];

const DateFields = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}: SubtasksFieldsProps) => {
  return (
    <>
      {/* TODO */}
      <Select
        id="type"
        name="type"
        value={options.find((option) => option.value === values.type)}
        onChange={(option) => {
          console.log(option);
          setFieldValue(values.type, option?.value || "");
        }}
        onBlur={handleBlur}
        options={options}
      />

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
