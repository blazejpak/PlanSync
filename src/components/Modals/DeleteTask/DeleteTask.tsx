import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { deleteTask } from "../../../store/reducers/tasks";

import Button from "../../button/Button";

import styles from "./DeleteTask.module.scss";
import { ROUTES } from "../../../types/routes";

const DeleteTask = () => {
  const { boardId, taskId } = useParams<{ boardId: string; taskId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDeleteTask = () => {
    if (!boardId || !taskId) return null;

    dispatch(deleteTask(taskId));
    navigate(ROUTES.ROUTE_BOARD(boardId));
  };

  const cancel = () => {
    if (!boardId || !taskId) return null;
    navigate(ROUTES.ROUTE_TASK(boardId, taskId));
  };

  return (
    <section className={styles.container}>
      <strong>Are you sure you want to delete this task?</strong>
      <div className={styles.buttons}>
        <Button typeOfButton="delete" onClick={handleDeleteTask} type="button">
          Delete
        </Button>
        <Button typeOfButton="cancel" onClick={cancel} type="button">
          Cancel
        </Button>
      </div>
    </section>
  );
};

export default DeleteTask;
