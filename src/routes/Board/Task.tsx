import { useEffect, useState } from "react";

import styles from "./Task.module.scss";

interface TaskProps {
  data: {
    uid: string;
    task: string;
    description: string;
    subtasks: {
      title: string;
      isDone: boolean;
    }[];
    date: string;
    subtasksDone: boolean;
    typeOfTask: string;
    userId: number;
  };
}

const Task = ({ data }: TaskProps) => {
  const { task, description, subtasks, typeOfTask } = data;

  const [progressOfSubtasks, setProgressOfSubtasks] = useState(0);

  useEffect(() => {
    const doneCount = subtasks.reduce((acc, item) => {
      return item.isDone ? acc + 1 : acc;
    }, 0);
    setProgressOfSubtasks(doneCount);
  }, [subtasks]);

  const progressValue = 1;

  return (
    <div className={styles.task}>
      <strong>{task}</strong>
      <div className={styles.progress}>
        <div className={styles.bar}>
          <div className={styles.bar_background}></div>

          <div className={styles.bar_background} style={{ width: pr }}></div>
        </div>
        <p>
          {progressOfSubtasks === 0
            ? 0
            : (progressOfSubtasks / subtasks.length).toFixed(2)}
          %
        </p>
      </div>

      <p>{description}</p>
    </div>
  );
};

export default Task;
