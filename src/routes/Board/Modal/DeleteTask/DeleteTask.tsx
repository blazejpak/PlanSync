import Overlay from "../Overlay";

import styles from "./DeleteTask.module.scss";
import { useSafeModalContext } from "../../../../context/ModalStates";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { allData, dataFromAllDays } from "../../../../store/reducers/data";
import Button from "../../../../components/button/Button";

const DeleteTask = () => {
  const dispatch = useAppDispatch();
  const { taskModal, setTaskModal, closeModal } = useSafeModalContext();
  const data = useAppSelector(dataFromAllDays);

  const deleteTask = () => {
    const newData = data.filter(
      (task) => task.uid !== taskModal.activeTaskData?.uid
    );

    dispatch(allData(newData));
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
        <Button typeOfButton="delete" onClick={deleteTask} type="button">
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
