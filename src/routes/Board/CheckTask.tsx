import { MouseEvent, useContext, useState } from "react";
import styles from "./CheckTask.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { ModalContext } from "../../context/ModalStates";

import SaveButton from "../../components/helpers/ui/SaveButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { allData, dataFromAllDays } from "../../store/reducers/data";

const CheckTask = () => {
  const {
    activeTaskData,
    setActiveTaskData,
    setTypeTaskModal,
    setIsTaskDesktopActive,
  } = useContext(ModalContext);
  const data = useAppSelector(dataFromAllDays);
  const dispatch = useAppDispatch();

  const [isEditTaskActive, setIsEditTaskActive] = useState(false);

  if (!activeTaskData) return null;

  const changeDoneSubtasks = (id: number) => {
    const changedSubtasks = activeTaskData.subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, isDone: !subtask.isDone } : subtask
    );
    setActiveTaskData({ ...activeTaskData, subtasks: changedSubtasks });
  };

  const editTaskHandler = () => {
    setTypeTaskModal("edit");
    setIsEditTaskActive(false);
  };

  const deleteTaskHandler = () => {
    setTypeTaskModal("delete");
    setIsEditTaskActive(false);
  };

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newData = data.map((task) => {
      if (task.uid === activeTaskData.uid) {
        return activeTaskData;
      }

      return task;
    });

    dispatch(allData(newData));
    setIsTaskDesktopActive(false);
  };

  return (
    <>
      <div className={styles.header}>
        <strong className={styles.header__text}>{activeTaskData.task}</strong>
        <button
          className={styles.header__button}
          onClick={() => setIsEditTaskActive((prev) => !prev)}
        >
          <HiDotsVertical size={30} />
        </button>

        {isEditTaskActive && (
          <div className={styles.header__edit}>
            <button
              className={styles["header__edit--edit"]}
              onClick={editTaskHandler}
            >
              Edit task
            </button>
            <button
              className={styles["header__edit--delete"]}
              onClick={deleteTaskHandler}
            >
              Delete task
            </button>
          </div>
        )}
      </div>
      <p className={styles.description}>{activeTaskData.description}</p>
      <ul className={styles.subtasks}>
        {activeTaskData.subtasks.map((subtask) => (
          <li
            key={subtask.id}
            className={styles.subtask}
            onClick={() => changeDoneSubtasks(subtask.id)}
          >
            <div
              className={`${styles.subtask__checkbox} ${
                subtask.isDone ? styles.active : ""
              }`}
            ></div>
            <p
              className={`${styles.subtask__text} ${
                subtask.isDone ? styles.active : ""
              }`}
            >
              {subtask.title}
            </p>
          </li>
        ))}
      </ul>
      <SaveButton onClick={saveTask}>Save Task</SaveButton>
    </>
  );
};

export default CheckTask;
