import { useSafeModalContext } from "../../../context/ModalStates";

import FilteredTasks from "../FilteredTasks/FilteredTasks";
import ShowTask from "../Modal/ShowTask/ShowTask";
import EditTask from "../Modal/EditTask/EditTask";
import DeleteTask from "../Modal/DeleteTask/DeleteTask";
import AddTask from "../Modal/AddTask/AddTask";

import styles from "./TasksDesktop.module.scss";
import DisplayTasksWithoutFilterType from "./DisplayTasksWithoutFilterType";
import DisplayTasksWithFilterType from "./DisplayTasksWithFilterType";

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
