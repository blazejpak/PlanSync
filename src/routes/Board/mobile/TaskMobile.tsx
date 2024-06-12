import styles from "./TaskMobile.module.scss";
import data from "../../../data.json";
import Task from "../Task";
import { useContext, useState } from "react";
import DisplayModal from "./DisplayModal";
import { ModalContext } from "../../../context/ModalStates";

const TaskMobile = () => {
  const [typeTasks, setTypeTasks] = useState<"todo" | "progress" | "done">(
    "todo"
  );
  const { isTaskMobileActive, setIsTaskMobileActive, setActiveTaskData } =
    useContext(ModalContext);

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <p
          className={`${styles.type__task} ${styles.todo} ${
            typeTasks === "todo" && styles["todo--active"]
          }`}
          onClick={() => setTypeTasks("todo")}
        >
          To do
        </p>
        <p
          className={`${styles.type__task} ${styles.progress} ${
            typeTasks === "progress" && styles["progress--active"]
          }`}
          onClick={() => setTypeTasks("progress")}
        >
          In progress
        </p>
        <p
          className={`${styles.type__task} ${styles.done} ${
            typeTasks === "done" && styles["done--active"]
          }`}
          onClick={() => setTypeTasks("done")}
        >
          Done
        </p>
      </div>
      <ul className={styles.tasks}>
        {data
          .filter((tasks) => tasks.typeOfTask === typeTasks)
          .map((task) => (
            <li
              key={task.uid}
              className={styles.task}
              onClick={() => {
                setIsTaskMobileActive(!isTaskMobileActive);
                setActiveTaskData(task);
              }}
            >
              <Task data={task} />
            </li>
          ))}
      </ul>
      {isTaskMobileActive && <DisplayModal />}
    </div>
  );
};

export default TaskMobile;
