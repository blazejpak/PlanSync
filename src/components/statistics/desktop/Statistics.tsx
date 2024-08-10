import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectIsStatisticsOpen,
  statisticsOpen,
} from "../../../store/reducers/statistics";
import profileImg from "../../../assets/profile-icon.png";

import styles from "./Statistics.module.scss";
import { IoLogOut, IoSettings, IoEye, IoEyeOff } from "react-icons/io5";
import { useSafeSettingsContext } from "../../../context/Settings";
import Settings from "../../modals/Settings/Settings";

const Statistics = () => {
  const { user } = useSafeUserContext();
  const dispatch = useAppDispatch();
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { changeSettingsModalActive, isModalSettingsOpen } =
    useSafeSettingsContext();

  console.log(isModalSettingsOpen);

  return (
    <section className={styles.container}>
      <button
        className={styles.button}
        onClick={() => dispatch(statisticsOpen(!isStatisticsOpen))}
      >
        {isStatisticsOpen ? <IoEyeOff size={36} /> : <IoEye size={36} />}
      </button>

      <div className={styles.buttons}>
        <button className={styles.profile__button}>
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
          <IoSettings size={30} />
        </button>
        <button className={styles.profile__button}>
          <IoLogOut size={30} />
        </button>
      </div>

      {isModalSettingsOpen && <Settings />}
    </section>
  );
};

export default Statistics;
