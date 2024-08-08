import { MouseEvent, useState } from "react";

import { useSafeModalContext } from "../../../context/ModalStates";
import { useAppDispatch } from "../../../store/hooks";
import { updateTask } from "../../../store/reducers/tasks";

import SaveButton from "../../button/SaveButton";
import Overlay from "../Overlay";

import { HiDotsVertical } from "react-icons/hi";
import styles from "./ShowTask.module.scss";

const ShowTask = () => {
  const { taskModal, setTaskModal, closeModal } = useSafeModalContext();
  const activeTask = taskModal.activeTaskData;
  const dispatch = useAppDispatch();

  const [isEditTaskActive, setIsEditTaskActive] = useState(false);

  if (!activeTask) return null;

  const changeDoneSubtasks = (id: number) => {
    const changedSubtasks = activeTask.subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, isDone: !subtask.isDone } : subtask
    );

    if (changedSubtasks) {
      setTaskModal({
        type: taskModal.type,
        prop: taskModal.prop,
        activeTaskData: {
          ...activeTask,
          subtasks: changedSubtasks,
        },
        isActive: true,
      });
    }
  };

  const editTaskHandler = () => {
    setIsEditTaskActive(false);

    setTaskModal({
      ...taskModal,
      type: "edit",
      prop: null,
      isActive: true,
    });
  };

  const deleteTaskHandler = () => {
    setIsEditTaskActive(false);

    setTaskModal({
      ...taskModal,
      type: "delete",
      prop: null,
      isActive: true,
    });
  };

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(updateTask(activeTask));
    closeModal();
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
      <SaveButton isSucceed={null} onClick={saveTask}>
        Save Task
      </SaveButton>
    </Overlay>
  );
};

export default ShowTask;
