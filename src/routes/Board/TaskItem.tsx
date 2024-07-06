import { useEffect, useState } from "react";

import styles from "./Task.module.scss";
import { Task } from "../../types/task";

interface TaskProps {
  data: Task;
}

const TaskItem = ({ data }: TaskProps) => {
  const { task, description, subtasks, typeOfTask } = data;

  const [progressOfSubtasks, setProgressOfSubtasks] = useState(0);

  useEffect(() => {
    const doneCount = subtasks.reduce((acc, item) => {
      return item.isDone ? acc + 1 : acc;
    }, 0);
    setProgressOfSubtasks(doneCount);
  }, [subtasks]);

  const progressValue = (
    (progressOfSubtasks / subtasks.length) *
    100
  ).toFixed();

  return (
    <div className={styles.task}>
      <strong>{task}</strong>
      <div className={styles.progress}>
        <div className={styles.bar}>
          <div className={styles.bar_background}></div>

          <div
            className={styles["bar_background--progress"]}
            style={{ width: progressValue + "%" }}
            data-set={typeOfTask}
          ></div>
        </div>
        <p>{progressOfSubtasks === 0 ? 0 : progressValue}%</p>
      </div>

      <p className={styles.task__description}>{description}</p>
    </div>
  );
};

export default TaskItem;
