import styles from "./TaskMobile.module.scss";
import { useState } from "react";

import FilteredTasks from "../FilteredTasks";
import { useSafeModalContext } from "../../../context/ModalStates";
import ShowTask from "../Modal/ShowTask/ShowTask";
import EditTask from "../Modal/EditTask/EditTask";
import DeleteTask from "../Modal/DeleteTask/DeleteTask";
import AddTask from "../Modal/AddTask/AddTask";

const TaskMobile = () => {
  const [typeTasks, setTypeTasks] = useState<"todo" | "progress" | "done">(
    "todo"
  );

  const { taskModal } = useSafeModalContext();

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
        <FilteredTasks typeOfDevice="mobile" typeOfTask={typeTasks} />
      </ul>
      {taskModal.type === "task" && taskModal.isActive && <ShowTask />}

      {taskModal.type === "edit" && taskModal.isActive && <EditTask />}

      {taskModal.type === "delete" && taskModal.isActive && <DeleteTask />}

      {taskModal.type === "add" && taskModal.isActive && <AddTask />}
    </div>
  );
};

export default TaskMobile;
