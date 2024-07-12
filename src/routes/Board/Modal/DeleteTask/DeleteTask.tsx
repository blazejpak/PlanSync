import Overlay from "../Overlay";

import styles from "./DeleteTask.module.scss";
import { useSafeModalContext } from "../../../../context/ModalStates";
import { useAppDispatch } from "../../../../store/hooks";
import Button from "../../../../components/button/Button";
import { deleteTaskFromFirestore } from "../../../../store/reducers/tasks";

const DeleteTask = () => {
  const dispatch = useAppDispatch();
  const { taskModal, setTaskModal, closeModal } = useSafeModalContext();
  const activeData = taskModal.activeTaskData;
  if (!activeData) return null;

  const deleteTask = (id: string) => {
    dispatch(deleteTaskFromFirestore(id));
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
    <Overlay>
      <strong>Are you sure you want to delete this task?</strong>
      <div className={styles.buttons}>
        <Button
          typeOfButton="delete"
          onClick={() => deleteTask(activeData.id)}
          type="button"
        >
          Delete
        </Button>
        <Button typeOfButton="cancel" onClick={cancel} type="button">
          Cancel
        </Button>
      </div>
    </Overlay>
  );
};

export default DeleteTask;
