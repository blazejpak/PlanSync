import TodayProgress from "../TodayProgress";
import { useAppSelector } from "../../../store/hooks";
import { selectDataFromTheCurrentDay } from "../../../store/reducers/tasks";

import styles from "./StatisticsMobile.module.scss";
import { todayTasksProgressMobile } from "../../../helpers/TodayTasksProgressMobile";

const StatisticsMobile = () => {
  const dayData = useAppSelector(selectDataFromTheCurrentDay);

  const countTodoTasks = todayTasksProgressMobile(dayData, "todo");
  const countProgressTasks = todayTasksProgressMobile(dayData, "progress");
  const countDoneTasks = todayTasksProgressMobile(dayData, "done");

  return (
    <div className={styles.container}>
      <strong>Today's Task Progress</strong>
      <div className={styles.bars}>
        <div className={styles.bar}>
          <TodayProgress countDoneTasks={countTodoTasks} />
          <p>To do</p>
        </div>
        <div className={styles.bar}>
          <TodayProgress countDoneTasks={countProgressTasks} />
          <p>In progress</p>
        </div>
        <div className={styles.bar}>
          <TodayProgress countDoneTasks={countDoneTasks} />
          <p>Done</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsMobile;
