import { useEffect } from "react";
import { DateTime } from "luxon";

import {
  pickCurrentDay,
  pickRangeDate,
  selectCurrentDay,
} from "../../store/reducers/calendar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import styles from "./CalendarPerDay.module.scss";

const CalendarPerDay = () => {
  const curDay = useAppSelector(selectCurrentDay);

  const time = DateTime.fromISO(curDay).setLocale("en-GB") as DateTime<true>;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pickRangeDate({ from: curDay, to: curDay }));
  }, [curDay]);

  const previousDay = () => {
    const value = time.minus({ days: 1 }).toISO().slice(0, 10);
    dispatch(pickCurrentDay(value));
  };

  const nextDay = () => {
    const value = time.plus({ days: 1 }).toISO().slice(0, 10);
    dispatch(pickCurrentDay(value));
  };

  return (
    <div className={styles.date}>
      <button onClick={previousDay}>
        <FaArrowLeft size={30} />
      </button>
      <div className={styles.text}>
        {
          <strong>
            {time.monthLong}, {time.day}
          </strong>
        }
        <p>{time.weekdayLong}</p>
      </div>
      <button onClick={nextDay}>
        <FaArrowRight size={30} />
      </button>
    </div>
  );
};

export default CalendarPerDay;
