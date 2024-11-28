import styles from "./Desktop.module.scss";
import Navigation from "../../../components/navigation/Navigation";
import CalendarPerDay from "../../../components/dates/CalendarPerDay";
import TaskList from "../TaskList";
import Statistics from "../../../components/statistics/desktop/Statistics";
import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";

const Desktop = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);

  return (
    <section
      className={`${styles.page} ${isStatisticsOpen ? styles.open : ""}`}
    >
      <Navigation />
      <section
        className={`${styles.board} ${isStatisticsOpen ? styles.open : ""}`}
      >
        <CalendarPerDay />
        <TaskList />
      </section>
      <Statistics />
    </section>
  );
};

export default Desktop;
