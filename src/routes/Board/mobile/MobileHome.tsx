import TaskList from "../TaskList";
import StatisticsMobile from "../../../components/statistics/mobile/StatisticsMobile";
import NavigationMobile from "../../../components/navigation/NavigationMobile";

import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";

import styles from "./MobileHome.module.scss";
import Header from "./Header";

const MobileHome = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);

  return (
    <section className={`${styles.page} ${isStatisticsOpen ? "open" : ""} `}>
      <Header />
      <StatisticsMobile />
      <section className={`${styles.board} ${isStatisticsOpen ? "open" : ""}`}>
        <strong className={styles.heading}>Task overview </strong>
        <TaskList />
      </section>

      <NavigationMobile />
    </section>
  );
};

export default MobileHome;
