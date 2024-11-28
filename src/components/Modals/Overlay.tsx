import { ReactNode, useRef } from "react";

import { useSafeModalContext } from "../../context/ModalStates";
import { useSafeSettingsContext } from "../../context/Settings";
import useClickOutside from "../../hooks/useClickOutside";

import { IoMdClose } from "react-icons/io";
import styles from "./Overlay.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../types/routes";

type OverlayProps = {
  children: ReactNode;
};

const Overlay = ({ children }: OverlayProps) => {
  const { setTaskModal, closeModal } = useSafeModalContext();
  const { closeSettingsModal } = useSafeSettingsContext();
  const { boardId } = useParams<{ boardId: string }>();

  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useClickOutside({
    ref: modalRef,
    callback: () => {
      if (boardId) {
        navigate(ROUTES.ROUTE_BOARD(boardId));
      }
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

            if (boardId) {
              navigate(ROUTES.ROUTE_BOARD(boardId));
            }
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
