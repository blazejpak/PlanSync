import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import styles from "./CalendarPerDay.module.scss";
import { useAppDispatch } from "../../store/hooks";
import { pickCurrentDay } from "../../store/reducers/data";

const CalendarPerDay = () => {
  const time = DateTime.now().setLocale("en-GB");

  const [date, setDate] = useState(time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dataISO = date.toISO().slice(0, 10);
    dispatch(pickCurrentDay(dataISO));
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
