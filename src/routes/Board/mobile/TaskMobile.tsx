import styles from "./TaskMobile.module.scss";
import Task from "../Task";
import { useContext, useEffect, useState } from "react";
import DisplayModal from "../DisplayModal";
import { ModalContext } from "../../../context/ModalStates";
import { TaskType } from "../../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import FilteredTasks from "../FilteredTasks";
import {
  dataFromTheCurrentDay,
  getCurrentDay,
} from "../../../store/reducers/data";

const TaskMobile = () => {
  const [typeTasks, setTypeTasks] = useState<"todo" | "progress" | "done">(
    "todo"
  );
  const [filteredData, setFilteredData] = useState<TaskType[]>([]);
  const { isTaskMobileActive, setIsTaskMobileActive, setActiveTaskData } =
    useContext(ModalContext);

  const dispatch = useAppDispatch();
  const data = useAppSelector(dataFromTheCurrentDay);
  const day = useAppSelector(getCurrentDay);

  useEffect(() => {
    const newData = data.filter((item) => item.typeOfTask === typeTasks);
    setFilteredData(newData);
  }, [day, typeTasks]);

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
      {/* {isTaskMobileActive && <DisplayModal />} */}
    </div>
  );
};

export default TaskMobile;
