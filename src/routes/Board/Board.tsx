import { ModalContextProvider } from "../../context/ModalStates";
import styles from "./Board.module.scss";

import TaskList from "./TaskList";
import CalendarPerDay from "../../components/dates/CalendarPerDay";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchAllTasks } from "../../store/reducers/tasks";

const Board = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <section className={styles.board}>
      <ModalContextProvider>
        <CalendarPerDay />
        <TaskList />
      </ModalContextProvider>
    </section>
  );
};

export default Board;
