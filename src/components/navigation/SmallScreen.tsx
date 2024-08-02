import { useRef, useState } from "react";

import { categoryBoardNav } from "../../helpers/CategoryBoardNav";
import useClickOutside from "../../hooks/useClickOutside";
import ButtonBoardNav from "../UI/BoardNavButton";
import { tasksBoardNav } from "../../helpers/TasksBoardNav";

import styles from "./SmallScreen.module.scss";
import { FaArrowLeft, FaArrowDown } from "react-icons/fa";
import { useSafeModalContext } from "../../context/ModalStates";
import { Category, typeFilter } from "../../types/task";

const SmallScreen = () => {
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
            {categoryBoardNav.map((category) => (
              <ButtonBoardNav
                changeCategory={() => changeCategoryButton(category.type)}
                key={category.text}
                text={category.text}
                icon={category.icon}
                numberOfTasks={1}
                isActive={category.type === typeCategory}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.navigation__container} ref={typeTaskButtonRef}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallScreen;
