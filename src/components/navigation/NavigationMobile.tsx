import {
  IoSettingsOutline,
  IoCalendarClearOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FaPlus, FaRegMessage } from "react-icons/fa6";

import styles from "./NavigationMobile.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../types/routes";
import { DateTime } from "luxon";
import { useSafeUserContext } from "../../context/AuthenticationContext";

const NavigationMobile = () => {
  const path = useLocation().pathname;
  const { currentUserData } = useSafeUserContext();
  const { userId } = currentUserData;

  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  let time: string = boardId!;
  if (!boardId) {
    time = DateTime.now().toISODate();
  }

  return (
    <footer className={styles.footer}>
      <button
        onClick={() => navigate(ROUTES.ROUTE_BOARD(time))}
        className={`${path === ROUTES.ROUTE_BOARD(time) && styles.active}`}
      >
        <IoHomeOutline />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_CALENDAR(time))}
        className={`${path === ROUTES.ROUTE_CALENDAR(time) && styles.active}`}
      >
        <IoCalendarClearOutline />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_ADD_TASK(time))}
        className={`${styles.add__task} ${
          path === ROUTES.ROUTE_ADD_TASK(time) && styles.active
        }`}
      >
        <FaPlus />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_SETTINGS(time))}
        className={`${path === ROUTES.ROUTE_SETTINGS(time) && styles.active}`}
      >
        <IoSettingsOutline />
      </button>
      <button
        onClick={() => navigate(ROUTES.ROUTE_MESSAGES(userId))}
        className={`${path === ROUTES.ROUTE_MESSAGES(userId) && styles.active}`}
      >
        <FaRegMessage />
      </button>
    </footer>
  );
};

export default NavigationMobile;
