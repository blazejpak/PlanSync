import { ModalContextProvider } from "../../context/ModalStates";
import CalendarPerDay from "./CalendarPerDay";
import styles from "./Board.module.scss";
import Tasks from "./Tasks";

const Board = () => {
  return (
    <section className={styles.board}>
      <ModalContextProvider>
        <CalendarPerDay />
        <Tasks />
      </ModalContextProvider>
    </section>
  );
};

export default Board;
