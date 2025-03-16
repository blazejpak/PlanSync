import { useState } from "react";

import { useSafeModalContext } from "../../../context/ModalStates";

import styles from "./TaskMobile.module.scss";
import FilteredTasks from "../FilteredTasks/FilteredTasks";
import Overlay from "../../../components/modals/Overlay";
import ShowTask from "../../../components/modals/showTask/ShowTask";
import EditTask from "../../../components/modals/editTask/EditTask";
import DeleteTask from "../../../components/modals/deleteTask/DeleteTask";
import AddTask from "../../../components/modals/addTask/AddTask";

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
      {taskModal.type === "task" && taskModal.isActive && (
        <Overlay>
          <ShowTask />
        </Overlay>
      )}

      {taskModal.type === "edit" && taskModal.isActive && (
        <Overlay>
          <EditTask />
        </Overlay>
      )}

      {taskModal.type === "delete" && taskModal.isActive && (
        <Overlay>
          <DeleteTask />
        </Overlay>
      )}

      {taskModal.type === "add" && taskModal.isActive && (
        <Overlay>
          <AddTask />
        </Overlay>
      )}
    </div>
  );
};

export default TaskMobile;
