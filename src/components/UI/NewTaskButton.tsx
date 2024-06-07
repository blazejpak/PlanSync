import styles from "./NewTaskButton.module.scss";

interface NewTaskButtonProps {
  text: string;
}

const NewTaskButton = ({ text }: NewTaskButtonProps) => {
  return <button className={styles.button}>{text}</button>;
};

export default NewTaskButton;
