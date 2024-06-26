import { DateTime, Interval } from "luxon";
import { useRef, useState } from "react";

import styles from "./Calendar.module.scss";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getRangeDate, pickRangeDate } from "../../../store/reducers/data";

const Calendar = () => {
  const dispatch = useAppDispatch();

  const rangeTaskDate = useAppSelector(getRangeDate);
  const [monthCalendar, setMonthCalendar] = useState(
    DateTime.fromISO(rangeTaskDate.from)
  );
  const [clickCount, setClickCount] = useState(0);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const startMonth = monthCalendar.startOf("month");
  const endMonth = monthCalendar.endOf("month");

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
    console.log(clickCount);
    setClickCount((prev) => (prev = prev + 1));
    console.log(clickCount);

    if (clickCount === 0) {
      if (DateTime.fromISO(day) <= DateTime.fromISO(rangeTaskDate.to)) {
        dispatch(pickRangeDate({ from: day, to: day }));
      } else {
        dispatch(pickRangeDate({ from: day, to: rangeTaskDate.to }));
      }
    } else if (clickCount === 1) {
      if (DateTime.fromISO(day) >= DateTime.fromISO(rangeTaskDate.from)) {
        dispatch(pickRangeDate({ from: rangeTaskDate.from, to: day }));
      } else {
        dispatch(
          pickRangeDate({
            from: rangeTaskDate.from,
            to: rangeTaskDate.from,
          })
        );
      }
    } else if (clickCount === 2) {
      if (DateTime.fromISO(day) >= DateTime.fromISO(rangeTaskDate.to)) {
        dispatch(pickRangeDate({ from: day, to: day }));
      } else {
        dispatch(pickRangeDate({ from: day, to: rangeTaskDate.to }));
      }
      setClickCount(1);
    }
  };

  const previousMonth = () => {
    const value = monthCalendar.minus({ month: 1 });

    setMonthCalendar(value);
  };

  const nextMonth = () => {
    const value = monthCalendar.plus({ month: 1 });

    setMonthCalendar(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button__container}>
        <button type="button" className={styles.button} onClick={showCalendar}>
          <p>{rangeTaskDate.from}</p>
        </button>

        <button type="button" className={styles.button} onClick={showCalendar}>
          <p>{rangeTaskDate.to}</p>
        </button>
      </div>
      {isCalendarOpen && (
        <div className={styles.calendar} ref={calendarRef}>
          <div className={styles.calendar__month}>
            <button type="button" onClick={previousMonth}>
              {"<"}
            </button>
            <p>{monthCalendar.monthLong}</p>
            <button type="button" onClick={nextMonth}>
              {">"}{" "}
            </button>
          </div>
          <div className={styles.calendar__days}>
            {intervals.map((day) => {
              if (day) {
                const from = day === rangeTaskDate.from;
                const to = day === rangeTaskDate.to;
                return (
                  <p
                    key={day}
                    onClick={() => pickDay(day)}
                    className={`${from ? styles.active__from : ""} ${
                      to ? styles.active__to : ""
                    }`}
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
