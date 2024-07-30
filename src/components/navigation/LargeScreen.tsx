import { categoryBoardNav } from "../../helpers/CategoryBoardNav";
import { tasksBoardNav } from "../../helpers/TasksBoardNav";
import ButtonBoardNav from "../UI/BoardNavButton";
import styles from "./LargeScreen.module.scss";

const LargeScreen = () => {
  return (
    <div className={styles.navigation__links}>
      <div className={styles["navigation__category"]}>
        <h2>Category</h2>
        {categoryBoardNav.map((category) => (
          <ButtonBoardNav
            text={category.text}
            icon={category.icon}
            numberOfTasks={1}
            key={category.text}
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
            key={category.text}
          />
        ))}
      </div>
    </div>
  );
};

export default LargeScreen;
