import styles from "./Tasks.module.scss";
import data from "../../data.json";
import Task from "./Task";

const TasksDesktop = () => {
  return (
    <div className={styles.tasks}>
      <div className={styles.column}>
        <p className={`${styles.todo} ${styles.tasks__name}`}>To do</p>
        <ul className={styles.list}>
          {data
            .filter((item) => item.typeOfTask === "todo")
            .map((task) => (
              <li key={task.uid}>
                <Task data={task} />
              </li>
            ))}
        </ul>
        <div className={styles.add__task}>
          <button data-color="todo">+</button>
        </div>
      </div>
      <div className={styles.column}>
        <p className={`${styles.progress} ${styles.tasks__name}`}>
          In Progress
        </p>
        <ul className={styles.list}>
          {data
            .filter((item) => item.typeOfTask === "progress")
            .map((task) => (
              <li key={task.uid}>
                <Task data={task} />
              </li>
            ))}
        </ul>
        <div className={styles.add__task}>
          <button data-color="progress">+</button>
        </div>
      </div>
      <div className={styles.column}>
        <p className={`${styles.done} ${styles.tasks__name}`}>done</p>
        <ul className={styles.list}>
          {data
            .filter((item) => item.typeOfTask === "done")
            .map((task) => (
              <li key={task.uid}>
                <Task data={task} />
              </li>
            ))}
        </ul>
        <div className={styles.add__task}>
          <button data-color="done">+</button>
        </div>
      </div>
    </div>
  );
};

export default TasksDesktop;
