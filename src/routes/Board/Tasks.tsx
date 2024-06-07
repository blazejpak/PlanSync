import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { DateTime } from "luxon";

import styles from "./Tasks.module.scss";

const Tasks = () => {
  const time = DateTime.now().setLocale("en-GB");
  console.log(time);

  return (
    <section className={styles.board}>
      <div className={styles.date}>
        <FaArrowLeft size={30} />
        <div className={styles.text}>
          <strong>
            {time.monthLong}, {time.day}
          </strong>
          <p>{time.weekdayLong}</p>
        </div>
        <FaArrowRight size={30} />
      </div>

      <div className={styles.tasks}>
        <div className={styles.column}>
          <p className={styles.todo}>To do</p>
        </div>
        <div className={styles.column}>
          <p className={styles.progress}>In Progress</p>
        </div>
        <div className={styles.column}>
          <p className={styles.done}>done</p>
        </div>
      </div>
    </section>
  );
};

export default Tasks;
