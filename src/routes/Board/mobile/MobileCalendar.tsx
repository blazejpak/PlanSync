import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  pickCurrentDay,
  selectCurrentDay,
  selectRangeDate,
} from "../../../store/reducers/calendar";
import { DateTime, Interval } from "luxon";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import styles from "./MobileCalendar.module.scss";
import { useSafeMobileContext } from "../../../context/MobileStates";
import Loading from "../../Loading";
import { selectAllData } from "../../../store/reducers/tasks";
import StatusDots from "./StatusDots";
import { useSafeModalContext } from "../../../context/ModalStates";
import { Category } from "../../../types/task";

const MobileCalendar = () => {
  const dispatch = useAppDispatch();
  const rangeTaskDate = useAppSelector(selectRangeDate);
  const currentDay = useAppSelector(selectCurrentDay);
  const [pickedDay, setPickedDay] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const data = useAppSelector(selectAllData);

  const { changeTypeOfPage } = useSafeMobileContext();
  const { typeCategory } = useSafeModalContext();

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
    dispatch(pickCurrentDay(day));
    setPickedDay(day);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      changeTypeOfPage("home");
    }, 500);
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
                  <div className={styles.day}>
                    <p key={`empty-${dayIndex}`}></p>
                  </div>
                );
              }

              const today = DateTime.now().toISO().slice(0, 10);
              const isToday = day === today;

              const dataByDay = data.filter((task) => {
                if (typeCategory !== Category.ALL) {
                  return (
                    task.rangeDateFrom <= day &&
                    task.rangeDateTo >= day &&
                    task.category === typeCategory
                  );
                } else {
                  return task.rangeDateFrom <= day && task.rangeDateTo >= day;
                }
              });

              return (
                <div
                  className={`${currentDay === day && styles.active__picked} ${
                    pickedDay === day && styles.active__picked
                  } ${isToday && styles.active__today} ${styles.day}`}
                >
                  <p key={day} onClick={() => pickDay(day)}>
                    {day?.slice(-2)}
                  </p>
                  <StatusDots data={dataByDay} day={day} />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default MobileCalendar;
