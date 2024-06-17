import { useContext } from "react";
import { ModalContext } from "../../context/ModalStates";
import { useAppSelector } from "../../store/hooks";
import Task from "./Task";

import styles from "./FilteredTasks.module.scss";

type FilteredTasksProps = {
  typeOfTask: "todo" | "progress" | "done";
  typeOfDevice: "desktop" | "mobile";
};

const FilteredTasks = ({ typeOfTask, typeOfDevice }: FilteredTasksProps) => {
  const {
    isTaskDesktopActive,
    setIsTaskDesktopActive,
    setActiveTaskData,
    isTaskMobileActive,
    setIsTaskMobileActive,
  } = useContext(ModalContext);

  const data = useAppSelector((state) => state.dataSlice.data);

  const filteredTasks = data.filter((item) => item.typeOfTask === typeOfTask);

  if (filteredTasks.length === 0 && typeOfDevice === "mobile") {
    return <p>Can't find any data</p>;
  }

  return (
    <>
      {typeOfDevice === "desktop"
        ? data
            .filter((item) => item.typeOfTask === typeOfTask)
            .map((task) => {
              return (
                <li
                  key={task.uid}
                  onClick={() => {
                    setIsTaskDesktopActive(!isTaskDesktopActive);
                    setActiveTaskData(task);
                  }}
                >
                  <Task data={task} />
                </li>
              );
            })
        : data
            .filter((item) => item.typeOfTask === typeOfTask)
            .map((task) => {
              return (
                <li
                  className={styles.task}
                  key={task.uid}
                  onClick={() => {
                    setIsTaskMobileActive(!isTaskMobileActive);
                    setActiveTaskData(task);
                  }}
                >
                  <Task data={task} />
                </li>
              );
            })}
    </>
  );
};

export default FilteredTasks;
