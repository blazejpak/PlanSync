import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { DateTime } from "luxon";

import styles from "./Tasks.module.scss";
import { useState } from "react";
import data from "../../data.json";
import Task from "./Task";

const Tasks = () => {
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

      <div className={styles.tasks}>
        <div className={styles.column}>
          <p className={styles.todo}>To do</p>
          <ul className={styles.list}>
            {data
              .filter((item) => item.typeOfTask === "todo")
              .map((task) => (
                <li key={task.uid}>
                  <Task data={task} />
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.progress}>In Progress</p>
          <ul className={styles.list}>
            {data
              .filter((item) => item.typeOfTask === "progress")
              .map((task) => (
                <li key={task.uid}>
                  <Task data={task} />
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p className={styles.done}>done</p>
          <ul className={styles.list}>
            {data
              .filter((item) => item.typeOfTask === "done")
              .map((task) => (
                <li key={task.uid}>
                  <Task data={task} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
