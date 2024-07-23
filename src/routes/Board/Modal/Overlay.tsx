import { ReactNode, useRef } from "react";

import { useSafeModalContext } from "../../../context/ModalStates";
import useClickOutside from "../../../hooks/useClickOutside";

import { IoMdClose } from "react-icons/io";
<<<<<<< HEAD
import { useSafeSettingsContext } from "../../../context/Settings";
=======
import styles from "./Overlay.module.scss";
>>>>>>> main

type OverlayProps = {
  children: ReactNode;
};

const Overlay = ({ children }: OverlayProps) => {
  const { setTaskModal, closeModal } = useSafeModalContext();
  const { closeSettingsModal } = useSafeSettingsContext();

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: modalRef,
    callback: () => {
      setTaskModal({
        isActive: false,
        prop: null,
        activeTaskData: null,
        type: null,
      });
    },
  });

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        <button
          className={styles.icon}
          onClick={() => {
            closeModal();
            closeSettingsModal();
          }}
        >
          <IoMdClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
