import { ChangeEvent, useState } from "react";
import styles from "./TypeTaskSelect.module.scss";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa6";
import { Subtask, ValuesTypes } from "./ValuesType";
import { FormikErrors } from "formik";

type CategoryPickerProps = {
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

const CategoryPicker = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}: CategoryPickerProps) => {
  const [isTypesSelectClicked, setIsTypesSelectClicked] = useState(false);

  const typesSelect = [
    { value: "todo" },
    { value: "progress" },
    { value: "done" },
  ];

  const handleTypesSelectValue = (value: string) => {
    setFieldValue("category", value);
    setIsTypesSelectClicked(false);
  };
  return (
    <div>
      <strong className={styles.heading}>Pick a category of task</strong>
      <button
        type="button"
        className={styles.select}
        onClick={() => setIsTypesSelectClicked(!isTypesSelectClicked)}
      >
        <div className={styles.select__container}>
          <p className={styles.select__label}>
            {typesSelect.find((option) => option.value === values.type)?.value}
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
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPicker;
