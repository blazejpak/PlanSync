import { ChangeEvent } from "react";

import styles from "./TaskFields.module.scss";
import Input from "../form/Input";

interface TaskFieldsProps {
  handleChange: (e: ChangeEvent) => void;
}

const TaskFields = ({ handleChange }: TaskFieldsProps) => (
  <div className={styles.inputs}>
    <Input
      id="task"
      name="task"
      label="Task"
      onChange={handleChange}
      required={true}
      placeholder="e.g. Take coffee break"
      type="text"
    />

    <Input
      id="description"
      name="description"
      label="Description"
      onChange={handleChange}
      required={false}
      placeholder="Brief pause during work or daily activities"
      type="textarea"
    />
  </div>
);

export default TaskFields;
