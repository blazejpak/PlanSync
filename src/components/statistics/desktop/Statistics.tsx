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

const Statistics = () => {
  const { user, SignOut } = useSafeUserContext();
  const dispatch = useAppDispatch();
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { changeSettingsModalActive, isModalSettingsOpen } =
    useSafeSettingsContext();

  const logout = () => {
    SignOut();
  };

  return (
    <section className={styles.container}>
      <button
        className={styles.button}
        onClick={() => dispatch(statisticsOpen(!isStatisticsOpen))}
      >
        {isStatisticsOpen ? <IoEyeOff size={36} /> : <IoEye size={36} />}
      </button>

      <div className={styles.buttons}>
        <button className={styles.profile__icon}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile Icon" />
          ) : (
            <img src={profileImg} alt="Profile Icon" />
          )}
        </button>
        <button
          className={styles.profile__button}
          onClick={() => changeSettingsModalActive(true)}
        >
          <IoSettings size={24} />
        </button>
        <button className={styles.profile__button} onClick={logout}>
          <IoLogOut size={24} />
        </button>
      </div>

      {isModalSettingsOpen && <Settings />}
    </section>
  );
};

export default Statistics;
