import TodayProgress from "../TodayProgress";
import { useAppSelector } from "../../../store/hooks";
import { selectDataFromTheCurrentDay } from "../../../store/reducers/tasks";

import styles from "./StatisticsMobile.module.scss";

const StatisticsMobile = () => {
  const dayDatas = useAppSelector(selectDataFromTheCurrentDay);

  const todoTasks = dayDatas.filter(
    (item) => item.typeOfTask === "todo" && item.subtasksDone
  );
  const progressTasks = dayDatas.filter(
    (item) => item.typeOfTask === "progress" && item.subtasksDone
  );
  const doneTasks = dayDatas.filter(
    (item) => item.typeOfTask === "done" && item.subtasksDone
  );

  const countTodoTasks = (todoTasks.length / dayDatas.length) * 100;
  const countProgressTasks = (progressTasks.length / dayDatas.length) * 100;
  const countDoneTasks = (doneTasks.length / dayDatas.length) * 100;

  return (
    <div className={styles.container}>
      <strong>Today's Task Progress</strong>
      <div className={styles.bars}>
        <TodayProgress countDoneTasks={countTodoTasks} />
        <TodayProgress countDoneTasks={countProgressTasks} />
        <TodayProgress countDoneTasks={countDoneTasks} />
      </div>
    </div>
  );
};

export default StatisticsMobile;
