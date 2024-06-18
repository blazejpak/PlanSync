import { useContext, useRef } from "react";
import styles from "./AddTask.module.scss";
import { ModalContext } from "../../context/ModalStates";
import useClickOutside from "../../components/helpers/helpers/useClickOutside";

const AddTask = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { setNewTaskModal } = useContext(ModalContext);

  useClickOutside({
    ref: modalRef,
    callback: () => setNewTaskModal({ isActive: false, typeOfTask: "todo" }),
  });

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}></div>
    </div>
  );
};

export default AddTask;
