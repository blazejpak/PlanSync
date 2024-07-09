import { DateTime, Interval } from "luxon";
import { useRef, useState } from "react";

import styles from "./Calendar.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getRangeDate, pickRangeDate } from "../../store/reducers/data";
import useClickOutside from "../../hooks/useClickOutside";

const Calendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const rangeTaskDate = useAppSelector(getRangeDate);
  const [monthCalendar, setMonthCalendar] = useState(
    DateTime.fromISO(rangeTaskDate.from)
  );
  const [activeInput, setActiveInput] = useState("from");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const startMonth = monthCalendar.startOf("month");
  const endMonth = monthCalendar.endOf("month");
  const intervals = Interval.fromDateTimes(
    startMonth.startOf("day"),
    endMonth.endOf("day")
  )
    .splitBy({ day: 1 })
    .map((date: Interval) => date.start?.toISODate());

  const showCalendar = (input: "from" | "to") => {
    setIsCalendarOpen(true);
    setActiveInput(input);
  };
  const pickDay = (day: string) => {
    if (activeInput === "from") {
      if (DateTime.fromISO(day) <= DateTime.fromISO(rangeTaskDate.to)) {
        dispatch(pickRangeDate({ from: day, to: rangeTaskDate.to }));
      } else {
        dispatch(pickRangeDate({ from: day, to: day }));
      }
      setActiveInput("to");
    } else if (activeInput === "to") {
      if (DateTime.fromISO(day) >= DateTime.fromISO(rangeTaskDate.from)) {
        dispatch(pickRangeDate({ from: rangeTaskDate.from, to: day }));
      } else {
        dispatch(
          pickRangeDate({ from: rangeTaskDate.from, to: rangeTaskDate.from })
        );
      }
      setActiveInput("from");
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

  useClickOutside({
    ref: calendarRef,
    callback: () => setIsCalendarOpen(false),
  });

  return (
    <div className={styles.container} ref={calendarRef}>
      <div className={styles.button__container}>
        <input
          className={styles.button}
          onClick={() => showCalendar("from")}
          value={rangeTaskDate.from}
          readOnly
        />

        <input
          className={styles.button}
          onClick={() => showCalendar("to")}
          value={rangeTaskDate.to}
          readOnly
        />
      </div>
      {isCalendarOpen && (
        <div className={styles.calendar}>
          <div className={styles.calendar__month}>
            <button type="button" onClick={previousMonth}>
              <FaArrowLeft size={16} />
            </button>
            <p>{monthCalendar.monthLong}</p>
            <button type="button" onClick={nextMonth}>
              <FaArrowRight size={16} />
            </button>
          </div>
          <div className={styles.calendar__days}>
            {intervals.map((day) => {
              if (day) {
                const from = day === rangeTaskDate.from;
                const to = day === rangeTaskDate.to;
                const isBetween =
                  day > rangeTaskDate.from && day < rangeTaskDate.to;
                const today = DateTime.now().toISO().slice(0, 10);
                const isToday = day === today;

                return (
                  <p
                    key={day}
                    onClick={() => pickDay(day)}
                    className={`${from ? styles.active__from : ""} ${
                      to ? styles.active__to : ""
                    } ${isBetween ? styles.active__between : ""} ${
                      isToday &&
                      today !== rangeTaskDate.from &&
                      today !== rangeTaskDate.to &&
                      styles.active__today
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
