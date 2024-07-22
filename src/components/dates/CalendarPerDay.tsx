import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import { pickCurrentDay, pickRangeDate } from "../../store/reducers/calendar";
import { useAppDispatch } from "../../store/hooks";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import styles from "./CalendarPerDay.module.scss";

const CalendarPerDay = () => {
  const time = DateTime.now().setLocale("en-GB");

  const [date, setDate] = useState(time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dataISO = date.toISO().slice(0, 10);
    dispatch(pickCurrentDay(dataISO));

    dispatch(pickRangeDate({ from: dataISO, to: dataISO }));
  }, [date]);

  const previousDay = () => {
    const value = date.minus({ days: 1 });
    setDate(value);
  };

  const nextDay = () => {
    const value = date.plus({ days: 1 });
    setDate(value);
  };

  return (
    <div className={styles.date}>
      <button onClick={previousDay}>
        <FaArrowLeft size={30} />
      </button>
      <div className={styles.text}>
        {
          <strong>
            {date.monthLong}, {date.day}
          </strong>
        }
        <p>{date.weekdayLong}</p>
      </div>
      <button onClick={nextDay}>
        <FaArrowRight size={30} />
      </button>
    </div>
  );
};

export default CalendarPerDay;
