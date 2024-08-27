import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectAllData } from "../../store/reducers/tasks";
import { Task } from "../../types/task";
import { DateTime, Interval } from "luxon";

import styles from "./TasksWeek.module.scss";
import { CircularProgress } from "@mui/material";

const today = DateTime.now().endOf("day");
const sevenDaysAgo = today.minus({ days: 7 });

const TasksWeek = () => {
  const [weekData, setWeekData] = useState<Task[]>([]);

  const data = useAppSelector(selectAllData);

  useEffect(() => {
    if (data.length <= 0) return;

    const newData = data.filter((item) => {
      const dateFrom = DateTime.fromISO(item.rangeDateFrom).startOf("day");
      const dateTo = DateTime.fromISO(item.rangeDateTo).endOf("day");
      const interval = Interval.fromDateTimes(dateFrom, dateTo);

      return interval.overlaps(Interval.fromDateTimes(sevenDaysAgo, today));
    });

    setWeekData(newData);
  }, [data]);

  const doneTasks = weekData.filter((item) => item.subtasksDone);
  const countDoneTasks = (doneTasks.length / weekData.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        <strong className={styles.score}>
          {countDoneTasks !== Infinity ? `${countDoneTasks}%` : 0}
        </strong>
        <div className={styles.inner}>
          <CircularProgress
            color="inherit"
            variant="determinate"
            size={80}
            value={100}
          />
        </div>
        <div className={styles.outer}>
          <CircularProgress
            variant="determinate"
            size={80}
            value={countDoneTasks}
          />
        </div>
      </div>

      <p className={styles.description}>Performance of the week</p>

      <p
        className={styles.performance}
      >{`${doneTasks.length} of ${weekData.length} completed successfully`}</p>
    </div>
  );
};

export default TasksWeek;
