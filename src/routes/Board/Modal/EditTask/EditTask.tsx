import { HiDotsVertical } from "react-icons/hi";
import styles from "../Overlay.module.scss";
import { MouseEvent, useContext, useState } from "react";
import { ModalContext } from "../../../../context/ModalStates";
import SaveButton from "../../../../components/helpers/ui/SaveButton";
import Overlay from "../Overlay";

const EditTask = () => {
  const { typeTaskModal, setTypeTaskModal, activeTask, setActiveTask } =
    useContext(ModalContext);

  const [isEditTaskActive, setIsEditTaskActive] = useState(false);

  if (!activeTask) return null;

  const changeActiveSubtasks = (id: number) => {
    const changedSubtasks = activeTask.subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, isDone: !subtask.isDone } : subtask
    );
    setActiveTask({ ...activeTask, subtasks: changedSubtasks });
  };

  const displayTaskHandler = () => {
    setTypeTaskModal({ type: "task", prop: null });
    setIsEditTaskActive(false);
  };

  const deleteTaskHandler = () => {
    setTypeTaskModal({ type: "delete", prop: null });
    setIsEditTaskActive(false);
  };

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  if (typeTaskModal.type !== "edit") return null;

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
      <p className={styles.description}>{activeTask.description}</p>
      <ul className={styles.subtasks}>
        {activeTask.subtasks.map((subtask) => (
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
    </Overlay>
  );
};

export default EditTask;
