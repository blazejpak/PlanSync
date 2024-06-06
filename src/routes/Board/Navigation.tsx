import ButtonBoardNav from "../../components/UI/BoardNavButton";
import NewTaskButton from "../../components/UI/NewTaskButton";
import { categoryBoardNav } from "../../helpers/CategoryBoardNav";

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

        {/* <div className={styles["navigation__category"]}>
          <h2>My Tasks</h2>
          <ButtonBoardNav text="to Do" />
          <ButtonBoardNav text="In Progress" />
          <ButtonBoardNav text="Done" />
        </div> */}

        <NewTaskButton />
      </nav>
    </section>
  );
};

export default Navigation;