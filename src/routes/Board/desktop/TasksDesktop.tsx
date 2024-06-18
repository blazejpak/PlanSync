import styles from "./TasksDesktop.module.scss";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalStates";
import DisplayModal from "../DisplayModal";
import FilteredTasks from "../FilteredTasks";
import AddTask from "../AddTask";

const TasksDesktop = () => {
  const { isTaskDesktopActive, newTaskModal, setNewTaskModal } =
    useContext(ModalContext);

  const addTask = (type: "todo" | "progress" | "done") => {
    setNewTaskModal({ isActive: true, typeOfTask: type });
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

      {isTaskDesktopActive && <DisplayModal />}
      {newTaskModal.isActive && <AddTask />}
    </div>
  );
};

export default TasksDesktop;
