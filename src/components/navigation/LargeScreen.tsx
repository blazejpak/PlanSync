import { useSafeModalContext } from "../../context/ModalStates";
import { categoryBoardNav } from "../../helpers/CategoryBoardNav";
import { tasksBoardNav } from "../../helpers/TasksBoardNav";
import ButtonBoardNav from "../UI/BoardNavButton";
import styles from "./LargeScreen.module.scss";

const LargeScreen = () => {
  const { changeCategory, changeTypeFilter, typeCategory, typeTaskFilter } =
    useSafeModalContext();

  return (
    <div className={styles.navigation__links}>
      <div className={styles["navigation__category"]}>
        <h2>Category</h2>
        <ul>
          {categoryBoardNav.map((category) => (
            <li key={category.text}>
              <ButtonBoardNav
                text={category.text}
                icon={category.icon}
                numberOfTasks={1}
                isActive={category.type === typeCategory}
                onClick={() => changeCategory(category.type)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles["navigation__category"]}>
        <h2>My Tasks</h2>

        <ul>
          {tasksBoardNav.map((category) => (
            <li key={category.text}>
              <ButtonBoardNav
                text={category.text}
                icon={category.icon}
                numberOfTasks={1}
                isActive={category.type === typeTaskFilter}
                onClick={() => changeTypeFilter(category.type)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LargeScreen;
