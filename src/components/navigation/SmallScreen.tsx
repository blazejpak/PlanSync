import { useRef, useState } from "react";

import { categoryBoardNav } from "../../helpers/CategoryBoardNav";
import useClickOutside from "../../hooks/useClickOutside";
import ButtonBoardNav from "../button/BoardNavButton";
import { tasksBoardNav } from "../../helpers/TasksBoardNav";

import styles from "./SmallScreen.module.scss";
import { FaArrowLeft, FaArrowDown } from "react-icons/fa";
import { useSafeModalContext } from "../../context/ModalStates";
import { Category, typeFilter } from "../../types/task";
import { useAppSelector } from "../../store/hooks";
import { selectDataFromTheCurrentDay } from "../../store/reducers/tasks";

const SmallScreen = () => {
  const data = useAppSelector(selectDataFromTheCurrentDay);

  const { changeCategory, changeTypeFilter, typeCategory, typeTaskFilter } =
    useSafeModalContext();

  const [isCategoryFilterClicked, setIsCategoryFilterClicked] = useState(false);
  const [isTypeTaskFilterClicked, setIsTypeTaskFilterClicked] = useState(false);

  const categoryButtonRef = useRef<HTMLDivElement>(null);
  const typeTaskButtonRef = useRef<HTMLDivElement>(null);

  useClickOutside({
    ref: categoryButtonRef,
    callback: () => setIsCategoryFilterClicked(false),
  });

  useClickOutside({
    ref: typeTaskButtonRef,
    callback: () => setIsTypeTaskFilterClicked(false),
  });

  const changeCategoryButton = (category: Category) => {
    changeCategory(category);
  };

  const changeTypeTasksButton = (category: typeFilter) => {
    changeTypeFilter(category);
  };

  return (
    <div className={styles.navigation__links}>
      <div className={styles.navigation__container} ref={categoryButtonRef}>
        <button
          type="button"
          className={styles["navigation__category"]}
          onClick={() => {
            setIsCategoryFilterClicked(!isCategoryFilterClicked);
            setIsTypeTaskFilterClicked(false);
          }}
        >
          <h2>Category</h2>
          {isCategoryFilterClicked ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </button>

        {isCategoryFilterClicked && (
          <div className={styles["navigation__list"]}>
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
          </div>
        )}
      </div>
      <div
        className={`${styles.navigation__container} ${styles["navigation__container_tasks"]}`}
        ref={typeTaskButtonRef}
      >
        <button
          type="button"
          className={styles["navigation__category"]}
          onClick={() => {
            setIsTypeTaskFilterClicked(!isTypeTaskFilterClicked);
            setIsCategoryFilterClicked(false);
          }}
        >
          <h2>My Tasks</h2>
          {isTypeTaskFilterClicked ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </button>
        {isTypeTaskFilterClicked && (
          <div className={styles["navigation__list"]}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallScreen;
