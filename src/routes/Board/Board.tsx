import { useEffect } from "react";

import { ModalContextProvider } from "../../context/ModalStates";
import { useAppDispatch } from "../../store/hooks";
import { fetchAllTasks } from "../../store/reducers/tasks";

import TaskList from "./TaskList";
import CalendarPerDay from "../../components/dates/CalendarPerDay";
import Navigation from "./navigation/Navigation";

import styles from "./Board.module.scss";

const Board = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <section className={styles.page}>
      <ModalContextProvider>
        <Navigation />
        <div className={styles.board}>
          <CalendarPerDay />
          <TaskList />
        </div>
      </ModalContextProvider>
    </section>
  );
};

export default Board;
