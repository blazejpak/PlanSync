import { useSafeModalContext } from "../../context/ModalStates";
import { categoryBoardNav } from "../../helpers/CategoryBoardNav";
import { tasksBoardNav } from "../../helpers/TasksBoardNav";
import { Category, typeFilter } from "../../types/task";
import ButtonBoardNav from "../UI/BoardNavButton";
import styles from "./LargeScreen.module.scss";

const LargeScreen = () => {
  const { changeCategory, changeTypeFilter, typeCategory, typeTaskFilter } =
    useSafeModalContext();

  const changeCategoryButton = (category: Category) => {
    changeCategory(category);
  };

  const changeTypeTasksButton = (category: typeFilter) => {
    changeTypeFilter(category);
  };

  return (
    <div className={styles.navigation__links}>
      <div className={styles["navigation__category"]}>
        <h2>Category</h2>
        <nav>
          {categoryBoardNav.map((category) => {
            return (
              <ButtonBoardNav
                changeCategory={() => changeCategoryButton(category.type)}
                key={category.text}
                text={category.text}
                icon={category.icon}
                numberOfTasks={1}
                isActive={category.type === typeCategory}
              />
            );
          })}
        </nav>
      </div>

      <div className={styles["navigation__category"]}>
        <h2>My Tasks</h2>

        <nav>
          {tasksBoardNav.map((category) => (
            <ButtonBoardNav
              changeCategory={() => changeTypeTasksButton(category.type)}
              key={category.text}
              text={category.text}
              icon={category.icon}
              numberOfTasks={1}
              isActive={category.type === typeTaskFilter}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default LargeScreen;
