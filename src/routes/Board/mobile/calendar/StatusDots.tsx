import { Task } from "../../../../types/task";
import styles from "./StatusDots.module.scss";

type StatusDotsProps = {
  data: Task[];
  day: any;
};

const StatusDots = ({ data }: StatusDotsProps) => {
  const hasTodo = data.some((task) => task.typeOfTask === "todo");
  const hasProgress = data.some((task) => task.typeOfTask === "progress");
  const hasDone = data.some((task) => task.typeOfTask === "done");

  return (
    <div className={styles.dots}>
      <div className={`${styles.todo} ${hasTodo && styles.active}`}></div>
      <div
        className={`${styles.progress} ${hasProgress && styles.active}`}
      ></div>
      <div className={`${styles.done} ${hasDone && styles.active}`}></div>
    </div>
  );
};

export default StatusDots;
