import { MouseEvent, useContext, useState } from "react";
import styles from "./ShowTask.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { allData, dataFromAllDays } from "../../../../store/reducers/data";
import { ModalContext } from "../../../../context/ModalStates";
import SaveButton from "../../../../components/helpers/ui/SaveButton";
import Overlay from "../Overlay";

const ShowTask = () => {
  const { activeTask, setActiveTask, setTypeTaskModal, setIsModalActive } =
    useContext(ModalContext);
  const data = useAppSelector(dataFromAllDays);
  const dispatch = useAppDispatch();

  const [isEditTaskActive, setIsEditTaskActive] = useState(false);

  if (!activeTask) return null;

  const changeDoneSubtasks = (id: number) => {
    const changedSubtasks = activeTask.subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, isDone: !subtask.isDone } : subtask
    );
    setActiveTask({ ...activeTask, subtasks: changedSubtasks });
  };

  const editTaskHandler = () => {
    setTypeTaskModal({ type: "edit", prop: null });
    setIsEditTaskActive(false);
  };

  const deleteTaskHandler = () => {
    setTypeTaskModal({ type: "delete", prop: null });
    setIsEditTaskActive(false);
  };

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newData = data.map((task) => {
      if (task.uid === activeTask.uid) {
        return activeTask;
      }

      return task;
    });

    dispatch(allData(newData));
    setIsModalActive(false);
  };

  return (
    <Overlay>
      <div className={styles.header}>
        <strong className={styles.header__text}>{activeTask.task}</strong>
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
      <p className={styles.description}>{activeTask.description}</p>
      <ul className={styles.subtasks}>
        {activeTask.subtasks.map((subtask) => (
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
    </Overlay>
  );
};

export default ShowTask;
