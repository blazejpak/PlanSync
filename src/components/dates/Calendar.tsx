import { DateTime, Interval } from "luxon";
import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { pickRangeDate, selectRangeDate } from "../../store/reducers/calendar";
import useClickOutside from "../../hooks/useClickOutside";

import styles from "./Calendar.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { DatesZones } from "../../types/dates";

const Calendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const rangeTaskDate = useAppSelector(selectRangeDate);
  const [monthCalendar, setMonthCalendar] = useState(
    DateTime.fromISO(rangeTaskDate.from).setLocale(DatesZones.LOCALE)
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

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const firstDayOfMonth = startMonth.weekday;
  const lastDayOfMonth = endMonth.weekday;

  const emptyFirstDays = Array(firstDayOfMonth - 1).fill(null);
  const emptyEndDays = Array(7 - lastDayOfMonth).fill(null);

  const allDays = [...emptyFirstDays, ...intervals, ...emptyEndDays];

  const groupDaysByWeek = (days: string[]) => {
    const weeks: Array<string[]> = [];
    let currentWeek: string[] = [];

    days.forEach((day, index) => {
      currentWeek.push(day);

      if (currentWeek.length === 7 || index === days.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeks;
  };

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

          <div className={styles.calendar__weekdays}>
            {weekDays.map((day) => (
              <p key={day} className={styles.weekday}>
                {day}
              </p>
            ))}
          </div>

          <div className={styles.calendar__days}>
            {groupDaysByWeek(allDays).map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className={styles.calendar__week}>
                {week.map((day, dayIndex) => {
                  if (day === null) {
                    return (
                      <p
                        key={`empty-${dayIndex}`}
                        className={styles.empty__day}
                      ></p>
                    );
                  }

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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
