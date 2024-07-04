import { ReactNode, useContext, useRef } from "react";
import styles from "./Overlay.module.scss";
import { ModalContext } from "../../../context/ModalStates";
import useClickOutside from "../../../components/helpers/helpers/useClickOutside";

type OverlayProps = {
  children: ReactNode;
};

const Overlay = ({ children }: OverlayProps) => {
  const { setIsModalActive, setTypeTaskModal } = useContext(ModalContext);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: modalRef,
    callback: () => {
      setIsModalActive(false);
      setTypeTaskModal({ type: null, prop: null });
    },
  });

  useClickOutside({
    ref: modalRef,
    callback: () => {
      setIsModalActive(false);
      setTypeTaskModal({ type: null, prop: null });
    },
  });

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]} ref={modalRef}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
