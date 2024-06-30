import { useContext } from "react";
import Button from "../../../../components/helpers/ui/Button";
import Overlay from "../Overlay";

import styles from "./DeleteTask.module.scss";
import { ModalContext } from "../../../../context/ModalStates";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { allData, dataFromAllDays } from "../../../../store/reducers/data";

const DeleteTask = () => {
  const dispatch = useAppDispatch();
  const { activeTask, setTypeTaskModal, setIsModalActive } =
    useContext(ModalContext);
  const data = useAppSelector(dataFromAllDays);

  const deleteTask = () => {
    const newData = data.filter((task) => task.uid !== activeTask?.uid);

    dispatch(allData(newData));
    setTypeTaskModal({ type: "task", prop: null });
    setIsModalActive(false);
  };

  const cancel = () => {
    setTypeTaskModal({ type: "task", prop: null });
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
