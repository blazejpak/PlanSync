import styles from "./BoardNavButton.module.scss";

interface ButtonBoardNavProps {
  text: string;
  icon: any;
  numberOfTasks: number;
}

const ButtonBoardNav = ({ text, icon, numberOfTasks }: ButtonBoardNavProps) => {
  return (
    <button className={styles.button} type="button">
      <div className={styles.icon}>{icon}</div>
      <p className={styles.text}>{text}</p>
      <p className={styles.number__tasks}>{numberOfTasks}</p>
    </button>
  );
};

export default ButtonBoardNav;
