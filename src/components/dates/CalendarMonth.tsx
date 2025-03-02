import { DateTime, Interval } from "luxon";
import { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import {
  selectCurrentDay,
  selectRangeDate,
} from "../../store/reducers/calendar";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import styles from "./CalendarMonth.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../types/routes";

const CalendarMonth = () => {
  const rangeTaskDate = useAppSelector(selectRangeDate);
  const currentDay = useAppSelector(selectCurrentDay);
  const navigate = useNavigate();

  const [monthCalendar, setMonthCalendar] = useState(
    DateTime.fromISO(rangeTaskDate.from).setLocale("en-GB")
  );

  const startMonth = monthCalendar.startOf("month");
  const endMonth = monthCalendar.endOf("month");
  const intervals = Interval.fromDateTimes(
    startMonth.startOf("day"),
    endMonth.endOf("day")
  )
    .splitBy({ day: 1 })
    .map((date: Interval) => date.start?.toISODate());

  const pickDay = (day: string) => {
    navigate(ROUTES.ROUTE_BOARD(day));
  };

  const previousMonth = () => {
    const value = monthCalendar.minus({ month: 1 });

    setMonthCalendar(value);
  };

  const nextMonth = () => {
    const value = monthCalendar.plus({ month: 1 });

    setMonthCalendar(value);
  };

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

                const today = DateTime.now().toISO().slice(0, 10);
                const isToday = day === today;
                const isPickedDay = day === currentDay;

                return (
                  <p
                    key={day}
                    onClick={() => pickDay(day)}
                    className={`${from ? styles.active__from : ""} ${
                      to ? styles.active__to : ""
                    }  ${isToday && styles.active__today} ${
                      isPickedDay && !isToday && styles.active__picked
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
  );
};

export default CalendarMonth;
