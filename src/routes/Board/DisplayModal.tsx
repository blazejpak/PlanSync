import { MouseEvent, useContext, useRef, useState } from "react";
import styles from "./DisplayModal.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { ModalContext } from "../../context/ModalStates";
import useClickOutside from "../../components/helpers/helpers/useClickOutside";
import SaveButton from "../../components/helpers/ui/SaveButton";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

const DisplayModal = () => {
  const {
    setIsTaskMobileActive,
    setIsTaskDesktopActive,
    activeTaskData,
    setActiveTaskData,
    typeTaskModal,
    setTypeTaskModal,
  } = useContext(ModalContext);

  const [isEditTaskActive, setIsEditTaskActive] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: modalRef,
    callback: () => {
      setIsTaskMobileActive(false);
      setTypeTaskModal("task");
    },
  });

  useClickOutside({
    ref: modalRef,
    callback: () => {
      setIsTaskDesktopActive(false);
      setTypeTaskModal("task");
    },
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

  const editTaskHandler = () => {
    setTypeTaskModal("edit");
    setIsEditTaskActive(false);
  };

  const deleteTaskHandler = () => {
    setTypeTaskModal("delete");
    setIsEditTaskActive(false);
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        {typeTaskModal === "task" && (
          <>
            <div className={styles.header}>
              <strong className={styles.header__text}>
                {activeTaskData.task}
              </strong>
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
        )}

        {/* EDIT TASK */}

        {typeTaskModal === "edit" && <EditTask />}

        {typeTaskModal === "delete" && <DeleteTask />}
      </div>
    </div>
  );
};

export default DisplayModal;
