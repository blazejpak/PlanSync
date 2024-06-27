import { ModalContextProvider } from "../../context/ModalStates";
import CalendarPerDay from "./CalendarPerDay";
import styles from "./Board.module.scss";
import Tasks from "./Tasks";
import { useEffect } from "react";
import data from "../../data.json";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  allData,
  dailyData,
  dataFromAllDays,
  getCurrentDay,
} from "../../store/reducers/data";
import { DateTime, Interval } from "luxon";

const Board = () => {
  const dispatch = useAppDispatch();
  const day = useAppSelector(getCurrentDay);
  const getAllData = useAppSelector(dataFromAllDays);

  useEffect(() => {
    if (getAllData.length === 0) {
      dispatch(allData(data));
    } else {
      const newData = getAllData.filter((item) => {
        const dateFrom = DateTime.fromISO(item.rangeDateFrom).startOf("day");
        const dateTo = DateTime.fromISO(item.rangeDateTo).endOf("day");
        const interval = Interval.fromDateTimes(dateFrom, dateTo);

        return interval.contains(DateTime.fromISO(day).startOf("day"));
      });
      dispatch(dailyData(newData));
    }
  }, [getAllData, day]);

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
