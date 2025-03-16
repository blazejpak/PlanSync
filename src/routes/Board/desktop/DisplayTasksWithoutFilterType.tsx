import FilteredTasks from "../FilteredTasks/FilteredTasks";

import styles from "./DisplayTasksWithoutFilterType.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../types/routes";

const DisplayTasksWithoutFilterType = () => {
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  if (!boardId) return null;

  return (
    <>
      <div className={styles.column}>
        <p className={`${styles.todo} ${styles.tasks__name}`}>To do</p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask="todo" typeOfDevice="desktop" />
        </ul>
        <button
          className={styles.add__task}
          onClick={() => navigate(ROUTES.ROUTE_ADD_TASK(boardId))}
        >
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
          onClick={() => navigate(ROUTES.ROUTE_ADD_TASK(boardId))}
        >
          <p data-color="progress">+</p>
        </button>
      </div>
      <div className={styles.column}>
        <p className={`${styles.done} ${styles.tasks__name}`}>done</p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask="done" typeOfDevice="desktop" />
        </ul>
        <button
          className={styles.add__task}
          onClick={() => navigate(ROUTES.ROUTE_ADD_TASK(boardId))}
        >
          <p data-color="done">+</p>
        </button>
      </div>
    </>
  );
};

export default DisplayTasksWithoutFilterType;
