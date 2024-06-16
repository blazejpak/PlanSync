import styles from "./TasksDesktop.module.scss";
import data from "../../../data.json";
import Task from "../Task";
import { useContext, useEffect, useState } from "react";
import { TaskType } from "../../../helpers/types";
import { ModalContext } from "../../../context/ModalStates";
import DisplayModal from "../DisplayModal";

const TasksDesktop = () => {
  const [filteredData, setFilteredData] = useState<TaskType[]>([]);
  const {
    day,
    isTaskDesktopActive,
    setIsTaskDesktopActive,
    setActiveTaskData,
  } = useContext(ModalContext);

  useEffect(() => {
    const newData = data.filter((tasks) => tasks.date === day);
    console.log(newData);
    setFilteredData(newData);
  }, [day]);

  console.log(isTaskDesktopActive);

  return (
    <div className={styles.tasks}>
      <div className={styles.column}>
        <p className={`${styles.todo} ${styles.tasks__name}`}>To do</p>
        {filteredData.filter((item) => item.typeOfTask === "todo").length >
          0 && (
          <ul className={styles.list}>
            {filteredData
              .filter((item) => item.typeOfTask === "todo")
              .map((task) => (
                <li
                  key={task.uid}
                  onClick={() => {
                    setIsTaskDesktopActive(!isTaskDesktopActive);
                    setActiveTaskData(task);
                  }}
                >
                  <Task data={task} />
                </li>
              ))}
          </ul>
        )}
        <button className={styles.add__task}>
          <p data-color="todo">+</p>
        </button>
      </div>
      <div className={styles.column}>
        <p className={`${styles.progress} ${styles.tasks__name}`}>
          In Progress
        </p>
        {filteredData.filter((item) => item.typeOfTask === "progress").length >
          0 && (
          <ul className={styles.list}>
            {filteredData
              .filter((item) => item.typeOfTask === "progress")
              .map((task) => (
                <li
                  key={task.uid}
                  onClick={() => {
                    setIsTaskDesktopActive(!isTaskDesktopActive);
                    setActiveTaskData(task);
                  }}
                >
                  <Task data={task} />
                </li>
              ))}
          </ul>
        )}
        <button className={styles.add__task}>
          <p data-color="progress">+</p>
        </button>
      </div>
      <div className={styles.column}>
        <p className={`${styles.done} ${styles.tasks__name}`}>done</p>
        {filteredData.filter((item) => item.typeOfTask === "done").length >
          0 && (
          <ul className={styles.list}>
            {filteredData
              .filter((item) => item.typeOfTask === "done")
              .map((task) => (
                <li
                  key={task.uid}
                  onClick={() => {
                    setIsTaskDesktopActive(!isTaskDesktopActive);
                    setActiveTaskData(task);
                  }}
                >
                  <Task data={task} />
                </li>
              ))}
          </ul>
        )}
        <button className={styles.add__task}>
          <p data-color="done">+</p>
        </button>
      </div>

      {isTaskDesktopActive && <DisplayModal />}
    </div>
  );
};

export default TasksDesktop;
