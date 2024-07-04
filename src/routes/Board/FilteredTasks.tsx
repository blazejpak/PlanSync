import { useContext } from "react";
import { ModalContext } from "../../context/ModalStates";
import { useAppSelector } from "../../store/hooks";
import Task from "./Task";

import styles from "./FilteredTasks.module.scss";
import { dataFromTheCurrentDay } from "../../store/reducers/data";

type FilteredTasksProps = {
  typeOfTask: "todo" | "progress" | "done";
  typeOfDevice: "desktop" | "mobile";
};

const FilteredTasks = ({ typeOfTask, typeOfDevice }: FilteredTasksProps) => {
  const { setTypeTaskModal, setIsModalActive, setActiveTask } =
    useContext(ModalContext);

  const data = useAppSelector(dataFromTheCurrentDay);

  const filteredTasks = data.filter((item) => item.typeOfTask === typeOfTask);

  if (filteredTasks.length === 0 && typeOfDevice === "mobile") {
    return <p>Can't find any data</p>;
  }

  return (
    <>
      {typeOfDevice === "desktop"
        ? filteredTasks.map((task) => {
            return (
              <li
                key={task.uid}
                onClick={() => {
                  setIsModalActive(true);
                  setTypeTaskModal({ type: "task", prop: null });
                  setActiveTask(task);
                }}
              >
                <Task data={task} />
              </li>
            );
          })
        : filteredTasks.map((task) => {
            return (
              <li
                className={styles.task}
                key={task.uid}
                onClick={() => {
                  setIsModalActive(true);
                  setTypeTaskModal({ type: "task", prop: null });
                  setActiveTask(task);
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
