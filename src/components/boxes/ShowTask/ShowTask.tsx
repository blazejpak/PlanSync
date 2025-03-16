import { MouseEvent, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectAllData,
  selectFetchStatus,
  updateTask,
} from "../../../store/reducers/tasks";

import SaveButton from "../../button/SaveButton";

import { HiDotsVertical } from "react-icons/hi";
import styles from "./ShowTask.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Status, Task } from "../../../types/task";
import { useSafeSettingsContext } from "../../../context/Settings";
import { ROUTES } from "../../../types/routes";
import Loading from "../../../routes/Loading";

const ShowTask = () => {
  const data = useAppSelector(selectAllData);
  const status = useAppSelector(selectFetchStatus);
  const { pickedTheme } = useSafeSettingsContext();

  const { boardId, taskId } = useParams<{ boardId: string; taskId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isEditTaskActive, setIsEditTaskActive] = useState(false);
  const [taskData, setTaskData] = useState<Task | null>(null);

  useEffect(() => {
    if (status === Status.SUCCEEDED && taskId) {
      const task = data.find((item) => item.id === taskId) || null;
      setTaskData(task);
    }
  }, [status, taskId, data]);

  if (status !== Status.SUCCEEDED) {
    return <Loading />;
  }
  if (!taskData) {
    return <div>Task not found or invalid URL.</div>;
  }

  const changeDoneSubtasks = (id: number) => {
    const changedSubtasks = taskData.subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, isDone: !subtask.isDone } : subtask
    );

    if (changedSubtasks) {
      const isEverySubtasksDone = changedSubtasks.every((item) => item.isDone);

      setTaskData({
        ...taskData,
        subtasksDone: isEverySubtasksDone,
        subtasks: changedSubtasks,
      });
    }
  };

  const editTaskHandler = () => {
    if (boardId && taskId) {
      navigate(ROUTES.ROUTE_EDIT_TASK(boardId, taskId));
    }
  };

  const deleteTaskHandler = () => {
    if (boardId && taskId) {
      navigate(ROUTES.ROUTE_DELETE_TASK(boardId, taskId));
    }
  };

  const saveTask = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(updateTask(taskData));
    if (boardId) {
      navigate(ROUTES.ROUTE_BOARD(boardId));
    }
  };

  return (
    <section>
      <div className={styles.header}>
        <strong className={styles.header__text}>{taskData.task}</strong>

        <button
          className={styles.header__button}
          onClick={() => setIsEditTaskActive((prev) => !prev)}
        >
          <HiDotsVertical
            size={30}
            color={`${pickedTheme === "dark" ? "white" : "black"}`}
          />
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
      <p className={styles.description}>{taskData.description}</p>
      <ul className={styles.subtasks}>
        {taskData.subtasks.map((subtask) => (
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
    </section>
  );
};

export default ShowTask;
