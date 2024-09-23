import CalendarPerDay from "../../../components/dates/CalendarPerDay";
import TaskList from "../TaskList";
import StatisticsMobile from "../../../components/statistics/mobile/StatisticsMobile";
import NavigationMobile from "../../../components/navigation/NavigationMobile";

import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";

import styles from "./Mobile.module.scss";
import Header from "./Header";

const Mobile = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);

  return (
    <section className={`${styles.page} ${isStatisticsOpen ? "open" : ""}`}>
      <Header />
      <StatisticsMobile />
      <section className={`${styles.board} ${isStatisticsOpen ? "open" : ""}`}>
        <CalendarPerDay />
        <TaskList />
      </section>
      <NavigationMobile />
    </section>
  );
};

export default Mobile;
