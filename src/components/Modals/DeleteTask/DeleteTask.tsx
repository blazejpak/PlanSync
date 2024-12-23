import { useSafeModalContext } from "../../../context/ModalStates";
import { useAppDispatch } from "../../../store/hooks";
import { deleteTask } from "../../../store/reducers/tasks";

import Button from "../../button/Button";
import Overlay from "../Overlay";

import styles from "./DeleteTask.module.scss";

const DeleteTask = () => {
  const dispatch = useAppDispatch();
  const { taskModal, setTaskModal, closeModal } = useSafeModalContext();
  const activeData = taskModal.activeTaskData;
  if (!activeData) return null;

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
    closeModal();
  };

  const cancel = () => {
    setTaskModal({
      ...taskModal,
      type: "task",
      prop: null,
      isActive: false,
    });
  };

  return (
    <section className={styles.container}>
      <strong>Are you sure you want to delete this task?</strong>
      <div className={styles.buttons}>
        <Button
          typeOfButton="delete"
          onClick={() => handleDeleteTask(activeData.id)}
          type="button"
        >
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
