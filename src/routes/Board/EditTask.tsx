import { HiDotsVertical } from "react-icons/hi";
import styles from "./DisplayModal.module.scss";
import { MouseEvent, useContext, useState } from "react";
import { ModalContext } from "../../context/ModalStates";
import SaveButton from "../../components/helpers/ui/SaveButton";

const EditTask = () => {
  const { typeTaskModal, setTypeTaskModal, activeTaskData, setActiveTaskData } =
    useContext(ModalContext);

  const [isEditTaskActive, setIsEditTaskActive] = useState(false);

  if (!activeTaskData) return null;

  const changeActiveSubtasks = (id: number) => {
    const changedSubtasks = activeTaskData.subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, isDone: !subtask.isDone } : subtask
    );
    setActiveTaskData({ ...activeTaskData, subtasks: changedSubtasks });
  };

  const displayTaskHandler = () => {
    setTypeTaskModal("task");
    setIsEditTaskActive(false);
  };

  const deleteTaskHandler = () => {
    setTypeTaskModal("delete");
    setIsEditTaskActive(false);
  };

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  if (typeTaskModal !== "edit") return null;

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
              onClick={displayTaskHandler}
            >
              Display task
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
            onClick={() => changeActiveSubtasks(subtask.id)}
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

export default EditTask;
