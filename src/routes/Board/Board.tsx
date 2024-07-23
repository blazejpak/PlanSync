import { useEffect } from "react";

import { ModalContextProvider } from "../../context/ModalStates";
import { useAppDispatch } from "../../store/hooks";
import { fetchAllTasks } from "../../store/reducers/tasks";

import TaskList from "./TaskList";
import CalendarPerDay from "../../components/dates/CalendarPerDay";
import Settings from "./Modal/Settings/Settings";
import { SettingsContextProvider } from "../../context/Settings";

import styles from "./Board.module.scss";

const Board = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <section className={styles.board}>
      <SettingsContextProvider>
        <ModalContextProvider>
          <CalendarPerDay />
          <TaskList />
          <Settings />
        </ModalContextProvider>
      </SettingsContextProvider>
    </section>
  );
};

export default Board;
