import styles from "./TasksDesktop.module.scss";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalStates";
import DisplayModal from "../DisplayModal";
import FilteredTasks from "../FilteredTasks";

const TasksDesktop = () => {
  const { isTaskDesktopActive } = useContext(ModalContext);

  return (
    <div className={styles.tasks}>
      <div className={styles.column}>
        <p className={`${styles.todo} ${styles.tasks__name}`}>To do</p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask="todo" typeOfDevice="desktop" />
        </ul>
        <button className={styles.add__task}>
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
        <button className={styles.add__task}>
          <p data-color="progress">+</p>
        </button>
      </div>
      <div className={styles.column}>
        <p className={`${styles.done} ${styles.tasks__name}`}>done</p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask="done" typeOfDevice="desktop" />
        </ul>
        <button className={styles.add__task}>
          <p data-color="done">+</p>
        </button>
      </div>

      {isTaskDesktopActive && <DisplayModal />}
    </div>
  );
};

export default TasksDesktop;
