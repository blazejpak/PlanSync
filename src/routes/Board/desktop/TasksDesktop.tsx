import { useSafeModalContext } from "../../../context/ModalStates";

import DisplayTasksWithoutFilterType from "./DisplayTasksWithoutFilterType";
import DisplayTasksWithFilterType from "./DisplayTasksInOneColumn";

import styles from "./TasksDesktop.module.scss";

const TasksDesktop = () => {
  const { typeTaskFilter } = useSafeModalContext();

  return (
    <div className={styles.tasks}>
      {typeTaskFilter === "all" ? (
        <DisplayTasksWithoutFilterType />
      ) : (
        <DisplayTasksWithFilterType />
      )}
    </div>
  );
};

export default TasksDesktop;
