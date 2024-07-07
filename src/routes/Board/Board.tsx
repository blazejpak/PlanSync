import { ModalContextProvider } from "../../context/ModalStates";
import styles from "./Board.module.scss";

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
import TaskList from "./TaskList";
import CalendarPerDay from "../../components/dates/CalendarPerDay";

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
        <TaskList />
      </ModalContextProvider>
    </section>
  );
};

export default Board;
