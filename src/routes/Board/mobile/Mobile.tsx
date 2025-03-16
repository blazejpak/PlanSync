import TaskList from "../TaskList";
import StatisticsMobile from "../../../components/statistics/mobile/StatisticsMobile";

import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";

import styles from "./Mobile.module.scss";
import Header from "./Header";

const Mobile = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);

  return (
    <section className={`${styles.page}`}>
      <Header />
      <StatisticsMobile />
      <section className={`${styles.board} ${isStatisticsOpen ? "open" : ""}`}>
        <strong className={styles.heading}>Task overview </strong>
        <TaskList />
      </section>
    </section>
  );
};

export default Mobile;
