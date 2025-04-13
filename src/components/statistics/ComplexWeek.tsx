import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectAllData } from "../../store/reducers/tasks";
import { WeekData } from "../../helpers/DaysData";
import { Task, typeFilter } from "../../types/task";
import { LinearProgress } from "@mui/material";

import styles from "./ComplexWeek.module.scss";
import { colors } from "../../helpers/colors";

const ComplexWeek = () => {
  const [dataArr, setDataArr] = useState<{
    todo: Task[];
    progress: Task[];
    done: Task[];
  }>({ todo: [], progress: [], done: [] });

  const data = useAppSelector(selectAllData);

  useEffect(() => {
    if (data.length <= 0) return;
    const newData = WeekData(data) as Task[];

    setDataArr({
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
    () => calculatePercentage(dataArr.todo),
    [dataArr.todo]
  );
  const countProgressTasks = useMemo(
    () => calculatePercentage(dataArr.progress),
    [dataArr.progress]
  );
  const countDoneTasks = useMemo(
    () => calculatePercentage(dataArr.done),
    [dataArr.done]
  );

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <p>Todo</p>
        <div className={styles.progress__bar}>
          <LinearProgress
            sx={{
              backgroundColor: "white",
              ".MuiLinearProgress-bar": {
                backgroundColor: colors.todo,
              },
            }}
            value={countTodoTasks}
            variant="determinate"
            style={{
              height: "2rem",
              width: "100%",
              borderRadius: "16px",
            }}
          />
          <p>{`${countTodoTasks.toFixed(2)}%`}</p>
        </div>
      </div>

      <div className={styles.progress}>
        <p>In Progress</p>
        <div className={styles.progress__bar}>
          <LinearProgress
            sx={{
              backgroundColor: "white",
              ".MuiLinearProgress-bar": {
                backgroundColor: colors.progress,
              },
            }}
            value={countProgressTasks}
            variant="determinate"
            style={{ height: "2rem", width: "100%", borderRadius: "16px" }}
          />
          <p>{`${countProgressTasks.toFixed(2)}%`}</p>
        </div>
      </div>

      <div className={styles.progress}>
        <p>Done</p>

        <div className={styles.progress__bar}>
          <LinearProgress
            sx={{
              backgroundColor: "white",
              ".MuiLinearProgress-bar": {
                backgroundColor: colors.done,
              },
            }}
            value={countDoneTasks}
            variant="determinate"
            style={{
              height: "2rem",
              width: "100%",
              borderRadius: "16px",
            }}
          />

          <p>{`${countDoneTasks.toFixed(2)}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default ComplexWeek;
