import { useState } from "react";
import styles from "./Desktop.module.scss";
import Navigation from "../../../components/navigation/Navigation";
import CalendarPerDay from "../../../components/dates/CalendarPerDay";
import TaskList from "../TaskList";
import Statistics from "../../../components/navigation/Statistics";

const Desktop = () => {
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

export default Desktop;
