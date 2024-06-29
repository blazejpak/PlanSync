import { useContext, useRef } from "react";
import styles from "./DisplayModal.module.scss";
import { ModalContext } from "../../context/ModalStates";
import useClickOutside from "../../components/helpers/helpers/useClickOutside";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import CheckTask from "./CheckTask";

const DisplayModal = () => {
  const {
    setIsTaskMobileActive,
    setIsTaskDesktopActive,
    typeTaskModal,
    setTypeTaskModal,
  } = useContext(ModalContext);

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

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        {typeTaskModal === "task" && <CheckTask />}

        {typeTaskModal === "edit" && <EditTask />}

        {typeTaskModal === "delete" && <DeleteTask />}
      </div>
    </div>
  );
};

export default DisplayModal;
