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
      <div className={styles.calendar__days}>
        {intervals.map((day) => {
          if (day) {
            const today = DateTime.now().toISO().slice(0, 10);
            const isToday = day === today;

            return (
              <p
                key={day}
                onClick={() => pickDay(day)}
                className={`${currentDay === day && styles.active__picked}  ${
                  isToday && styles.active__today
                } `}
              >
                {day?.slice(-2)}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;
