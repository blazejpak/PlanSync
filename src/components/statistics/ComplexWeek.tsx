import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectAllData } from "../../store/reducers/tasks";
import { WeekData } from "../../helpers/WeekData";
import { Task, typeFilter } from "../../types/task";
import { LinearProgress } from "@mui/material";

import styles from "./ComplexWeek.module.scss";

const ComplexWeek = () => {
  const [weekData, setWeekData] = useState<{
    todo: Task[];
    progress: Task[];
    done: Task[];
  }>({ todo: [], progress: [], done: [] });

  const data = useAppSelector(selectAllData);

  useEffect(() => {
    if (data.length <= 0) return;

    const newData = WeekData(data) as Task[];

    setWeekData({
      todo: newData.filter((item) => item.typeOfTask === typeFilter.TODO),
      progress: newData.filter(
        (item) => item.typeOfTask === typeFilter.PROGRESS
      ),
      done: newData.filter((item) => item.typeOfTask === typeFilter.DONE),
    });
  }, [data]);

  const calculatePercentage = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completedCount = tasks.filter((item) => item.subtasksDone).length;
    return (completedCount / tasks.length) * 100;
  };

  const countTodoTasks = useMemo(
    () => calculatePercentage(weekData.todo),
    [weekData.todo]
  );
  const countProgressTasks = useMemo(
    () => calculatePercentage(weekData.progress),
    [weekData.progress]
  );
  const countDoneTasks = useMemo(
    () => calculatePercentage(weekData.done),
    [weekData.done]
  );

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <LinearProgress
          value={countTodoTasks}
          variant="determinate"
          style={{
            height: "2rem",
            width: "100%",
            borderRadius: "16px",
          }}
        />
        <p>{`${countTodoTasks}%`}</p>
      </div>
      <div className={styles.progress}>
        <LinearProgress
          value={countProgressTasks}
          variant="determinate"
          style={{ height: "2rem", width: "100%", borderRadius: "16px" }}
        />
        <p>{`${countProgressTasks}%`}</p>
      </div>
      <div className={styles.progress}>
        <LinearProgress
          value={countDoneTasks}
          variant="determinate"
          style={{
            height: "2rem",
            width: "100%",
            borderRadius: "16px",
          }}
        />

        <p>{`${countDoneTasks}%`}</p>
      </div>
    </div>
  );
};

export default ComplexWeek;
