import ButtonBoardNav from "../../../components/UI/BoardNavButton";
import { categoryBoardNav } from "../../../helpers/CategoryBoardNav";
import { tasksBoardNav } from "../../../helpers/TasksBoardNav";
import logo from "../../../assets/logo.png";

import styles from "./Navigation.module.scss";
import Button from "../../../components/button/Button";
import { useSafeModalContext } from "../../../context/ModalStates";

const Navigation = () => {
  const { setTaskModal } = useSafeModalContext();

  const handleButtonClick = () => {
    setTaskModal({
      type: "add",
      prop: "todo",
      activeTaskData: null,
      isActive: true,
    });
  };

  return (
    <section className={styles.container}>
      <img alt="logo" src={logo} height={50} className={styles.image} />

      <nav className={styles.navigation}>
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
        <Button
          typeOfButton={null}
          className={styles.button}
          onClick={handleButtonClick}
        >
          + Add new task
        </Button>
      </nav>
    </section>
  );
};

export default Navigation;
