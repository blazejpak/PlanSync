import { ChangeEvent, FocusEvent, useState } from "react";
import { Stack } from "@mui/material";
import { Field, FormikErrors } from "formik";

import styles from "./AddTask/AddTask.module.scss";
import { Subtask, ValuesTypes } from "./ValuesType";
import Calendar from "../../../components/dates/Calendar";

import { FaArrowLeft, FaArrowDown } from "react-icons/fa";

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

const DateFields = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}: SubtasksFieldsProps) => {
  const [isTypesSelectClicked, setIsTypesSelectClicked] = useState(false);

  const typesSelect = [
    { label: "To do", value: "todo" },
    { label: "In progress", value: "progress" },
    { label: "Done", value: "done" },
  ];
  // console.log(v)
  const handleTypesSelectValue = (value: string) => {
    setFieldValue(values.type, value);
    setIsTypesSelectClicked(false);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className={styles.select}
          onClick={() => setIsTypesSelectClicked(!isTypesSelectClicked)}
        >
          <div className={styles.select__container}>
            <p className={styles.select__label}>
              {
                typesSelect.find((option) => option.value === values.type)
                  ?.label
              }
            </p>
            {isTypesSelectClicked ? (
              <FaArrowDown size={16} />
            ) : (
              <FaArrowLeft size={16} />
            )}
          </div>
        </button>
        {isTypesSelectClicked && (
          <div className={styles.select__options}>
            {typesSelect.map((option) => (
              <p
                key={option.value}
                onClick={() => handleTypesSelectValue(option.value)}
                className={styles.select__option}
              >
                {option.label}
              </p>
            ))}
          </div>
        )}
      </div>

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
