import { useState } from "react";

import Navigation from "../../../components/navigation/Navigation";
import CalendarPerDay from "../../../components/dates/CalendarPerDay";
import TaskList from "../TaskList";
import StatisticsMobile from "../../../components/statistics/mobile/StatisticsMobile";

import styles from "./Mobile.module.scss";

const Mobile = () => {
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);

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
