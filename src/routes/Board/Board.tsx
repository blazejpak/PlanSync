import { ModalContextProvider } from "../../context/ModalStates";
import CalendarPerDay from "./CalendarPerDay";
import styles from "./Board.module.scss";
import Tasks from "./Tasks";
import { useEffect } from "react";
import data from "../../data.json";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { sendData } from "../../store/reducers/data";

const Board = () => {
  const dispatch = useAppDispatch();
  const day = useAppSelector((state) => state.dataSlice.day);

  useEffect(() => {
    if (day) {
      const prevData = data;
      const newData = prevData.filter((item) => item.date === day);
      dispatch(sendData(newData));
    }
  }, [day]);

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
