import { DateTime, Interval } from "luxon";
import { useRef, useState } from "react";

import styles from "./Calendar.module.scss";
import useClickOutside from "../helpers/useClickOutside";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { pickDate } from "../../../store/reducers/date";

const Calendar = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const date = useAppSelector((state) => state.dateSlice.date);
  const time = DateTime.fromISO(date);

  const dispatch = useAppDispatch();

  const calendarRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: calendarRef,
    callback: () => setIsCalendarOpen(false),
  });

  const startMonth = time.startOf("month");
  const endMonth = time.endOf("month");

  const intervals = Interval.fromDateTimes(
    startMonth.startOf("day"),
    endMonth.endOf("day")
  )
    .splitBy({ day: 1 })
    .map((date: Interval) => date.start?.toISODate());

  const showCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };
  const pickDay = (day: string) => {
    dispatch(pickDate(day));
  };

  const previousMonth = () => {
    const value = time.minus({ month: 1 });
    const newMonth = value.toISO()?.slice(0, 10);

    if (newMonth) {
      dispatch(pickDate(newMonth));
    }
  };

  const nextMonth = () => {
    const value = time.plus({ month: 1 });
    const newMonth = value.toISO()?.slice(0, 10);

    if (newMonth) {
      dispatch(pickDate(newMonth));
    }
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.button} onClick={showCalendar}>
        <p>{date}</p>
      </button>
      {isCalendarOpen && (
        <div className={styles.calendar} ref={calendarRef}>
          <div className={styles.calendar__month}>
            <button type="button" onClick={previousMonth}>
              {"<"}
            </button>
            <p>{time.monthLong}</p>
            <button type="button" onClick={nextMonth}>
              {">"}{" "}
            </button>
          </div>
          <div className={styles.calendar__days}>
            {intervals.map((day) => {
              if (day) {
                const activeDay = day === time.toISODate();
                return (
                  <p
                    key={day}
                    onClick={() => pickDay(day)}
                    className={activeDay ? styles.active : ""}
                  >
                    {day?.slice(-2)}
                  </p>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
