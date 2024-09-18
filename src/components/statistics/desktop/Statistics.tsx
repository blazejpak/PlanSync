import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectIsStatisticsOpen,
  statisticsOpen,
} from "../../../store/reducers/statistics";
import { useSafeSettingsContext } from "../../../context/Settings";
import Settings from "../../modals/Settings/Settings";

import { IoLogOut, IoSettings, IoEye, IoEyeOff } from "react-icons/io5";
import profileImg from "../../../assets/profile-icon.png";
import styles from "./Statistics.module.scss";
import CalendarMonth from "../../dates/CalendarMonth";
import Clock from "../../dates/Clock";
import TasksWeek from "../TasksWeek";
import ComplexWeek from "../ComplexWeek";
import { useEffect, useState } from "react";

const Statistics = () => {
  const { user, SignOut } = useSafeUserContext();
  const dispatch = useAppDispatch();
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { changeSettingsModalActive, isModalSettingsOpen, pickedTheme } =
    useSafeSettingsContext();

  const [profilePhoto, setProfilePhoto] = useState(profileImg); // Ustawienie domyślnego zdjęcia

  useEffect(() => {
    const loadProfilePhoto = async () => {
      // Sprawdzenie, czy photoURL istnieje i jest typu string
      if (user?.photoURL && typeof user.photoURL === "string") {
        try {
          setProfilePhoto(user.photoURL as string); // Asercja typu
        } catch (error) {
          console.error("Błąd ładowania zdjęcia:", error);
          setProfilePhoto(profileImg); // Fallback do domyślnej ikony w przypadku błędu
        }
      } else {
        setProfilePhoto(profileImg); // Fallback, jeśli photoURL nie istnieje lub nie jest stringiem
      }
    };

    loadProfilePhoto();
  }, [user]);

  const logout = () => {
    SignOut();
  };

  console.log(user.photoURL);

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
              <img
                src={profilePhoto}
                alt="Profile Icon"
                referrerPolicy="no-referrer"
              />
            </button>
            <button
              className={styles.profile__button}
              onClick={() => changeSettingsModalActive(true)}
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

      {isModalSettingsOpen && <Settings />}

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
