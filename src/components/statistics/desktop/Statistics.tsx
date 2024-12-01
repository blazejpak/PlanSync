import { IoLogOut, IoSettings, IoEye, IoEyeOff } from "react-icons/io5";
import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectIsStatisticsOpen,
  statisticsOpen,
} from "../../../store/reducers/statistics";
import { useSafeSettingsContext } from "../../../context/Settings";
import Settings from "../../modals/Settings/Settings";

import CalendarMonth from "../../dates/CalendarMonth";
import Clock from "../../dates/Clock";
import TasksWeek from "../TasksWeek";
import ComplexWeek from "../ComplexWeek";
import { ProfilePhoto } from "../../../helpers/ProfilePhoto";

import styles from "./Statistics.module.scss";
import Overlay from "../../modals/Overlay";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../types/routes";

const Statistics = () => {
  const { SignOut, currentUserData } = useSafeUserContext();
  const { profileImage } = currentUserData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { isModalSettingsOpen, pickedTheme } = useSafeSettingsContext();

  const logout = () => {
    SignOut();
  };
  console.log(profileImage);
  console.log(currentUserData);
  const iconColor = pickedTheme === "dark" ? "white" : "black";

  return (
    <section
      className={`${styles.container} ${isStatisticsOpen && styles.open}`}
    >
      <div>
        <div className={styles.controls}>
          <div
            className={`${styles.buttons} ${isStatisticsOpen && styles.open}`}
          >
            <button className={styles.profile__icon}>
              <ProfilePhoto profileImage={profileImage} />
            </button>
            <button
              className={styles.profile__button}
              onClick={() => {
                if (boardId) {
                  navigate(ROUTES.ROUTE_SETTINGS(boardId));
                }
              }}
              style={{ color: iconColor }}
            >
              <IoSettings size={24} />
            </button>
            <button
              className={styles.profile__button}
              onClick={logout}
              style={{ color: iconColor }}
            >
              <IoLogOut size={24} />
            </button>
          </div>
          {isStatisticsOpen && <Clock />}
        </div>
        {isStatisticsOpen && <CalendarMonth />}
      </div>

      {isStatisticsOpen && <TasksWeek />}

      {isStatisticsOpen && <ComplexWeek />}

      {isModalSettingsOpen && (
        <Overlay>
          <Settings />
        </Overlay>
      )}

      <button
        className={`${styles.button} ${isStatisticsOpen && styles.open}`}
        style={{ color: iconColor }}
        onClick={() => dispatch(statisticsOpen(!isStatisticsOpen))}
      >
        {isStatisticsOpen ? <IoEyeOff size={36} /> : <IoEye size={36} />}
      </button>
    </section>
  );
};

export default Statistics;
