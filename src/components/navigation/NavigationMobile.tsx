import {
  IoSettingsOutline,
  IoCalendarClearOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FaPlus, FaRegMessage } from "react-icons/fa6";

import styles from "./NavigationMobile.module.scss";
import { typeOfPageProps } from "../../types/mobile";
import { useSafeMobileContext } from "../../context/MobileStates";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../types/routes";

const NavigationMobile = () => {
  const path = useLocation().pathname;

  const { changeTypeOfPage } = useSafeMobileContext();
  const { typeOfPage } = useSafeMobileContext();
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  if (!boardId) return null;

  const handleSettings = (value: typeOfPageProps) => {
    changeTypeOfPage(value);
  };

  return (
    <footer className={styles.footer}>
      <button
        onClick={() => navigate(ROUTES.ROUTE_BOARD(boardId))}
        className={`${path === ROUTES.ROUTE_BOARD(boardId) && styles.active}`}
      >
        <IoHomeOutline />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_CALENDAR(boardId))}
        className={`${
          path === ROUTES.ROUTE_CALENDAR(boardId) && styles.active
        }`}
      >
        <IoCalendarClearOutline />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_ADD_TASK(boardId))}
        className={`${styles.add__task} ${
          path === ROUTES.ROUTE_ADD_TASK(boardId) && styles.active
        }`}
      >
        <FaPlus />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_SETTINGS(boardId))}
        className={`${
          path === ROUTES.ROUTE_SETTINGS(boardId) && styles.active
        }`}
      >
        <IoSettingsOutline />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_MESSAGES(boardId))}
        className={`${
          path === ROUTES.ROUTE_MESSAGES(boardId) && styles.active
        }`}
      >
        <FaRegMessage />
      </button>
    </footer>
  );
};

export default NavigationMobile;
