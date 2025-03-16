import { ChangeEvent } from "react";

import styles from "./TaskFields.module.scss";
import Input from "../form/Input";
import { ValuesTypes } from "./ValuesType";

interface TaskFieldsProps {
  values: ValuesTypes;
  handleChange: (e: ChangeEvent) => void;
}

const TaskFields = ({ handleChange, values }: TaskFieldsProps) => (
  <div className={styles.inputs}>
    <Input
      id="task"
      name="task"
      label="Task"
      onChange={handleChange}
      required={true}
      placeholder="e.g. Take coffee break"
      type="text"
      values={values}
    />

    <Input
      id="description"
      name="description"
      label="Description"
      onChange={handleChange}
      required={false}
      placeholder="Brief pause during work or daily activities"
      type="textarea"
      values={values}
    />
  </div>
);

export default TaskFields;
