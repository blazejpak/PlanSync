import Navigation from "./Navigation";
import Statistics from "./Statistics";
import Tasks from "./Tasks";

import styles from "./Board.module.scss";

const Board = () => {
  return (
    <div className={styles.board}>
      <Navigation />
      <Tasks />
      <Statistics />
    </div>
  );
};

export default Board;
