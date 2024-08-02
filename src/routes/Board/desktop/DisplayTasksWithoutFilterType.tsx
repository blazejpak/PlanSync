import FilteredTasks from "../FilteredTasks/FilteredTasks";

import styles from "./DisplayTasksWithoutFilterType.module.scss";
import { useSafeModalContext } from "../../../context/ModalStates";

const DisplayTasksWithoutFilterType = () => {
  const { setTaskModal } = useSafeModalContext();

  const addTask = (type: "todo" | "progress" | "done") => {
    setTaskModal({
      type: "add",
      prop: type,
      activeTaskData: null,
      isActive: true,
    });
  };

  return (
    <>
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
    </>
  );
};

export default DisplayTasksWithoutFilterType;
