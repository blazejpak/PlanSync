import { useSafeModalContext } from "../../../context/ModalStates";

import DisplayTasksWithoutFilterType from "./DisplayTasksWithoutFilterType";
import DisplayTasksWithFilterType from "./DisplayTasksInOneColumn";
import ShowTask from "../../../components/modals/ShowTask/ShowTask";
import EditTask from "../../../components/modals/EditTask/EditTask";
import DeleteTask from "../../../components/modals/DeleteTask/DeleteTask";
import AddTask from "../../../components/modals/AddTask/AddTask";

import styles from "./TasksDesktop.module.scss";

const TasksDesktop = () => {
  const { taskModal, typeTaskFilter } = useSafeModalContext();

  return (
    <div className={styles.tasks}>
      {typeTaskFilter === "all" ? (
        <DisplayTasksWithoutFilterType />
      ) : (
        <DisplayTasksWithFilterType />
      )}

      {taskModal.type === "task" && taskModal.isActive && <ShowTask />}

      {taskModal.type === "edit" && taskModal.isActive && <EditTask />}

      {taskModal.type === "delete" && taskModal.isActive && <DeleteTask />}

      {taskModal.type === "add" && taskModal.isActive && <AddTask />}
    </div>
  );
};

export default TasksDesktop;
