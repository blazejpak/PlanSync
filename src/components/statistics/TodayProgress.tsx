import { CircularProgress } from "@mui/material";

import styles from "./TodayProgress.module.scss";

type TodayProgressProps = {
  countDoneTasks: number;
};

const TodayProgress = ({ countDoneTasks }: TodayProgressProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.result}>
        <strong className={styles.score}>
          {countDoneTasks !== Infinity && !Number.isNaN(countDoneTasks)
            ? `${countDoneTasks.toFixed(0)}%`
            : "0%"}
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
    </div>
  );
};

export default TodayProgress;
