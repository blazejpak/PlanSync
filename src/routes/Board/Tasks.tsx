import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { DateTime } from "luxon";

import styles from "./Tasks.module.scss";
import { useEffect, useState } from "react";
import TaskMobile from "./TaskMobile";
import TasksDesktop from "./TasksDesktop";

const Tasks = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handlerResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handlerResize);
    handlerResize();

    return () => window.removeEventListener("resize", handlerResize);
  }, []);

  const time = DateTime.now().setLocale("en-GB");

  const [date, setDate] = useState(time);

  const previousDay = () => {
    const value = date.minus({ days: 1 });
    setDate(value);
  };

  const nextDay = () => {
    const value = date.plus({ days: 1 });
    setDate(value);
  };

  return (
    <section className={styles.board}>
      <div className={styles.date}>
        <button onClick={previousDay}>
          <FaArrowLeft size={30} />
        </button>
        <div className={styles.text}>
          <strong>
            {date.monthLong}, {date.day}
          </strong>
          <p>{date.weekdayLong}</p>
        </div>
        <button onClick={nextDay}>
          <FaArrowRight size={30} />
        </button>
      </div>

      {isMobile ? <TaskMobile /> : <TasksDesktop />}
    </section>
  );
};

export default Tasks;
