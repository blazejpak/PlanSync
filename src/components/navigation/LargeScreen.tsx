import { useSafeModalContext } from "../../context/ModalStates";
import { categoryBoardNav } from "../../helpers/CategoryBoardNav";
import { tasksBoardNav } from "../../helpers/TasksBoardNav";
import { useAppSelector } from "../../store/hooks";
import { selectDataFromTheCurrentDay } from "../../store/reducers/tasks";
import { Category, typeFilter } from "../../types/task";
import ButtonBoardNav from "../button/BoardNavButton";
import styles from "./LargeScreen.module.scss";

const LargeScreen = () => {
  const { changeCategory, changeTypeFilter, typeCategory, typeTaskFilter } =
    useSafeModalContext();
  const data = useAppSelector(selectDataFromTheCurrentDay);

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
            let numberOfTasksWithCategory;
            if (category.type === Category.ALL) {
              numberOfTasksWithCategory = data.length;
            } else {
              numberOfTasksWithCategory = data.filter(
                (item) => item.category === category.type
              ).length;
            }
            return (
              <ButtonBoardNav
                changeCategory={() => changeCategoryButton(category.type)}
                key={category.text}
                text={category.text}
                icon={category.icon}
                numberOfTasks={numberOfTasksWithCategory}
                isActive={category.type === typeCategory}
              />
            );
          })}
        </nav>
      </div>

      <div className={styles["navigation__category"]}>
        <h2>My Tasks</h2>

        <nav>
          {tasksBoardNav.map((typeTask) => {
            let numberOfTasksWithTypeTask;
            if (typeTask.type === typeFilter.ALL) {
              numberOfTasksWithTypeTask = data.length;
            } else {
              numberOfTasksWithTypeTask = data.filter(
                (item) => item.typeOfTask === typeTask.type
              ).length;
            }
            return (
              <ButtonBoardNav
                changeCategory={() => changeTypeTasksButton(typeTask.type)}
                key={typeTask.text}
                text={typeTask.text}
                icon={typeTask.icon}
                numberOfTasks={numberOfTasksWithTypeTask}
                isActive={typeTask.type === typeTaskFilter}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default LargeScreen;
