import { useContext, useRef } from "react";
import styles from "./DisplayModal.module.scss";
import useClickOutside from "../../../components/helpers/useClickOutside";
import { ModalContext } from "../../../context/ModalStates";

const DisplayModal = () => {
  const { setIsTaskMobileActive, activeTaskData, setActiveTaskData } =
    useContext(ModalContext);
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

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        <strong>{activeTaskData.task}</strong>
        <p>{activeTaskData.description}</p>
        <ul className={styles.subtasks}>
          {activeTaskData.subtasks.map((subtask) => (
            <li
              key={subtask.id}
              className={styles.subtask}
              onClick={() => changeDoneSubtasks(subtask.id)}
            >
              <p
                className={`${styles.subtask__text} ${
                  subtask.isDone ? styles.active : ""
                }`}
              >
                {subtask.title}
              </p>
              <div
                className={`${styles.subtask__checkbox} ${
                  subtask.isDone ? styles.active : ""
                }`}
              ></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DisplayModal;
