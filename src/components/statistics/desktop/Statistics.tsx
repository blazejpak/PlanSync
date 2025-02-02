import { IoLogOut, IoSettings, IoEye, IoEyeOff } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectIsStatisticsOpen,
  statisticsOpen,
} from "../../../store/reducers/statistics";
import { useSafeSettingsContext } from "../../../context/Settings";

import CalendarMonth from "../../dates/CalendarMonth";
import Clock from "../../dates/Clock";
import TasksWeek from "../TasksWeek";
import ComplexWeek from "../ComplexWeek";
import { ProfilePhoto } from "../../../helpers/ProfilePhoto";

import styles from "./Statistics.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../types/routes";
import { useEffect, useState } from "react";
import { findConversationsByUserId } from "../../../services/messageService";
import { useSafeMessagesContext } from "../../../context/Messages";
import Conversations from "../../../routes/Board/desktop/messages/Conversations";
import Conversation from "../../../routes/Board/desktop/messages/Conversation";

const Statistics = () => {
  const { SignOut, currentUserData } = useSafeUserContext();
  const {
    changeConversationsData,
    isConversationsOpen,
    changeIsConversationsOpen,
    isConversationOpen,
  } = useSafeMessagesContext();
  const { profileImage } = currentUserData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { pickedTheme } = useSafeSettingsContext();

  const logout = () => {
    SignOut();
  };

  const iconColor = pickedTheme === "dark" ? "white" : "black";

  useEffect(() => {
    const fetchData = async () => {
      const getConversations = await findConversationsByUserId(
        currentUserData.userId
      );
      changeConversationsData(getConversations);
    };
    fetchData();
  }, []);

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

      <div
        className={`${styles["buttons__bottom"]} ${
          isStatisticsOpen && styles.open
        }`}
      >
        <button
          className={`${styles.button} `}
          style={{ color: iconColor }}
          onClick={() => changeIsConversationsOpen()}
        >
          <FaRegMessage size={36} />
        </button>

        <button
          className={`${styles.button} ${isStatisticsOpen && styles.open}`}
          style={{ color: iconColor }}
          onClick={() => dispatch(statisticsOpen(!isStatisticsOpen))}
        >
          {isStatisticsOpen ? <IoEyeOff size={36} /> : <IoEye size={36} />}
        </button>
      </div>

      {isConversationsOpen && <Conversations />}
      {isConversationOpen && <Conversation />}
    </section>
  );
};

export default Statistics;
