import styles from "./TasksDesktop.module.scss";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalStates";

import FilteredTasks from "../FilteredTasks";

import ShowTask from "../Modal/ShowTask/ShowTask";
import EditTask from "../Modal/EditTask/EditTask";
import DeleteTask from "../Modal/DeleteTask/DeleteTask";
import AddTask from "../Modal/AddTask/AddTask";

const TasksDesktop = () => {
  const { typeTaskModal, isModalActive, setIsModalActive, setTypeTaskModal } =
    useContext(ModalContext);

  const addTask = (type: "todo" | "progress" | "done") => {
    setIsModalActive(true);
    setTypeTaskModal({ type: "add", prop: type });
  };

  return (
    <div className={styles.tasks}>
      <div className={styles.column}>
        <p className={`${styles.todo} ${styles.tasks__name}`}>To do</p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask="todo" typeOfDevice="desktop" />
        </ul>
        <button className={styles.add__task} onClick={() => addTask("todo")}>
          <p data-color="todo">+</p>
        </button>
      </div>
      <div className={styles.column}>
        <p className={`${styles.progress} ${styles.tasks__name}`}>
          In Progress
        </p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask="progress" typeOfDevice="desktop" />
        </ul>
        <button
          className={styles.add__task}
          onClick={() => addTask("progress")}
        >
          <p data-color="progress">+</p>
        </button>
      </div>
      <div className={styles.column}>
        <p className={`${styles.done} ${styles.tasks__name}`}>done</p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask="done" typeOfDevice="desktop" />
        </ul>
        <button className={styles.add__task} onClick={() => addTask("done")}>
          <p data-color="done">+</p>
        </button>
      </div>

      {typeTaskModal.type === "task" && isModalActive && <ShowTask />}

      {typeTaskModal.type === "edit" && isModalActive && <EditTask />}

      {((typeTaskModal.type === "delete" && isModalActive) ||
        (typeTaskModal.type === "delete" && isModalActive)) && <DeleteTask />}

      {typeTaskModal.type === "add" && isModalActive && <AddTask />}
    </div>
  );
};

export default TasksDesktop;
