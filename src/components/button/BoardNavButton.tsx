import { ButtonHTMLAttributes } from "react";
import styles from "./BoardNavButton.module.scss";

type ButtonBoardNavProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  icon: any;
  isActive: Boolean;
  numberOfTasks: number;
  changeCategory: () => void;
};

const ButtonBoardNav = ({
  text,
  isActive,
  icon,
  numberOfTasks,
  changeCategory,
}: ButtonBoardNavProps) => {
  return (
    <button
      className={`${styles.button} ${isActive && styles.active}`}
      type="button"
      onClick={changeCategory}
    >
      <div className={styles.icon}>{icon}</div>
      <p className={styles.text}>{text}</p>
      <p className={styles.number__tasks}>{numberOfTasks}</p>
    </button>
  );
};

export default ButtonBoardNav;
