import ButtonBoardNav from "../../components/UI/BoardNavButton";
import NewTaskButton from "../../components/UI/NewTaskButton";
import { categoryBoardNav } from "../../helpers/CategoryBoardNav";
import { tasksBoardNav } from "../../helpers/TasksBoardNav";

import styles from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <section className={styles.container}>
      <p>LOGO IMG</p>

      <nav className={styles.navigation}>
        <div className={styles["navigation__category"]}>
          <h2>Category</h2>
          {categoryBoardNav.map((category) => (
            <ButtonBoardNav
              text={category.text}
              icon={category.icon}
              numberOfTasks={1}
            />
          ))}
        </div>

        <div className={styles["navigation__category"]}>
          <h2>My Tasks</h2>

          {tasksBoardNav.map((category) => (
            <ButtonBoardNav
              text={category.text}
              icon={category.icon}
              numberOfTasks={1}
            />
          ))}
        </div>

        <NewTaskButton text="+ Add new task " />
      </nav>
    </section>
  );
};

export default Navigation;
