import { ChangeEvent, useState } from "react";
import styles from "./TypeTaskSelect.module.scss";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa6";
import { Subtask, ValuesTypes } from "./ValuesType";
import { FormikErrors } from "formik";

type TypeTaskSelectProps = {
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
};

const TypeTaskSelect = ({ values, setFieldValue }: TypeTaskSelectProps) => {
  const [isTypesSelectClicked, setIsTypesSelectClicked] = useState(false);

  const typesSelect = [
    { label: "To do", value: "todo" },
    { label: "In progress", value: "progress" },
    { label: "Done", value: "done" },
  ];

  const handleTypesSelectValue = (value: string) => {
    setFieldValue("type", value);
    setIsTypesSelectClicked(false);
  };
  return (
    <div>
      <strong className={styles.heading}>Pick a progress of task</strong>
      <button
        type="button"
        className={styles.select}
        onClick={() => setIsTypesSelectClicked(!isTypesSelectClicked)}
      >
        <div className={styles.select__container}>
          <p className={styles.select__label}>
            {values.type
              ? typesSelect.find((option) => option.value === values.type)
                  ?.label
              : "todo"}
          </p>
          {isTypesSelectClicked ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </div>
      </button>
      {isTypesSelectClicked && (
        <ul className={styles.select__options}>
          {typesSelect.map((option) => (
            <li
              key={option.value}
              onClick={() => handleTypesSelectValue(option.value)}
              className={styles.select__option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeTaskSelect;
