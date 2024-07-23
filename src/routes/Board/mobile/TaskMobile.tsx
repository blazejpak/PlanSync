import { useEffect, useState } from "react";

import { selectCurrentDay } from "../../../store/reducers/calendar";
import { selectDataFromTheCurrentDay } from "../../../store/reducers/tasks";
import { Task } from "../../../types/task";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import FilteredTasks from "../FilteredTasks";

import styles from "./TaskMobile.module.scss";

const TaskMobile = () => {
  const [typeTasks, setTypeTasks] = useState<"todo" | "progress" | "done">(
    "todo"
  );

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectDataFromTheCurrentDay);
  const day = useAppSelector(selectCurrentDay);

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
      {taskModal.type === "task" && taskModal.isActive && <ShowTask />}

      {taskModal.type === "edit" && taskModal.isActive && <EditTask />}

      {taskModal.type === "delete" && taskModal.isActive && <DeleteTask />}

      {taskModal.type === "add" && taskModal.isActive && <AddTask />}
    </div>
  );
};

export default TaskMobile;
