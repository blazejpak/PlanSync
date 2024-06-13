import { MouseEvent, useContext, useRef, useState } from "react";
import styles from "./DisplayModal.module.scss";
import useClickOutside from "../../../components/helpers/helpers/useClickOutside";
import { ModalContext } from "../../../context/ModalStates";
import SaveButton from "../../../components/helpers/ui/SaveButton";
import { HiDotsVertical } from "react-icons/hi";

const DisplayModal = () => {
  const { setIsTaskMobileActive, activeTaskData, setActiveTaskData } =
    useContext(ModalContext);
  const [isEditTaskActive, setIsEditTaskActive] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: modalRef,
    callback: () => setIsTaskMobileActive(false),
  });

  if (!activeTaskData) return null;

  const changeDoneSubtasks = (id: number) => {
    const changedSubtasks = activeTaskData.subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, isDone: !subtask.isDone } : subtask
    );
    setActiveTaskData({ ...activeTaskData, subtasks: changedSubtasks });
  };

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
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
              <button className={styles["header__edit--edit"]}>
                Edit task
              </button>
              <button className={styles["header__edit--delete"]}>
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
      </div>
    </div>
  );
};

export default DisplayModal;
