import { useEffect } from "react";

import { ModalContextProvider } from "../../context/ModalStates";
import { useAppDispatch } from "../../store/hooks";
import { fetchAllTasks } from "../../store/reducers/tasks";

import TaskList from "./TaskList";
import CalendarPerDay from "../../components/dates/CalendarPerDay";
import Settings from "./Modal/Settings/Settings";
import { useSafeSettingsContext } from "../../context/Settings";

import styles from "./Board.module.scss";
import { useSafeUserContext } from "../../context/AuthenticationContext";
import { getPersonalData } from "../../utils/firebase/AuthService";

const Board = () => {
  const { changeDarkTheme, changeFontFamily, changeFontSize } =
    useSafeSettingsContext();
  const { currentUserData } = useSafeUserContext();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  useEffect(() => {
    const getData = async () => {
      const userData = await getPersonalData(currentUserData.userId);

      if (userData) {
        changeDarkTheme(userData.appSettings.uiTheme);
        changeFontFamily(userData.appSettings.fontFamily);
        changeFontSize(userData.appSettings.fontSize);
      }
    };
    getData();
  }, [currentUserData.userId]);

  return (
    <section className={styles.board}>
      <ModalContextProvider>
        <CalendarPerDay />
        <TaskList />
        <Settings />
      </ModalContextProvider>
    </section>
  );
};

export default Board;
