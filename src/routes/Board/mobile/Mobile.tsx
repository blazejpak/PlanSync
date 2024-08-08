import { useState } from "react";

import Navigation from "../../../components/navigation/Navigation";
import CalendarPerDay from "../../../components/dates/CalendarPerDay";
import TaskList from "../TaskList";
import Statistics from "../../../components/navigation/Statistics";

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
      <Statistics />
    </section>
  );
};

export default Mobile;
