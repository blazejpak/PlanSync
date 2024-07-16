import styles from "./LargeScreen.module.scss";
import ButtonBoardNav from "../../../components/UI/BoardNavButton";
import { categoryBoardNav } from "../../../helpers/CategoryBoardNav";
import { tasksBoardNav } from "../../../helpers/TasksBoardNav";

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
    </div>
  );
};

export default LargeScreen;
