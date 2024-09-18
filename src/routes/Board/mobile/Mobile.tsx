import Navigation from "../../../components/navigation/Navigation";
import CalendarPerDay from "../../../components/dates/CalendarPerDay";
import TaskList from "../TaskList";
import StatisticsMobile from "../../../components/statistics/mobile/StatisticsMobile";

import styles from "./Mobile.module.scss";
import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";

const Mobile = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);

  return (
    <section className={`${styles.page} ${isStatisticsOpen ? "open" : ""}`}>
      <Navigation />
      <section className={`${styles.board} ${isStatisticsOpen ? "open" : ""}`}>
        <CalendarPerDay />
        <TaskList />
      </section>
      <StatisticsMobile />
    </section>
  );
};

export default Mobile;
