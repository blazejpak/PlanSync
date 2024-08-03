import { useEffect, useState } from "react";
import { useSafeModalContext } from "../../../context/ModalStates";
import { typeFilter } from "../../../types/task";
import FilteredTasks from "../FilteredTasks/FilteredTasks";

import styles from "./DisplayTasksInOneColumn.module.scss";

const DisplayTasksInOneColumn = () => {
  const { setTaskModal, typeTaskFilter } = useSafeModalContext();
  const [title, setTitle] = useState("");

  const addTask = (type: "todo" | "progress" | "done") => {
    setTaskModal({
      type: "add",
      prop: type,
      activeTaskData: null,
      isActive: true,
    });
  };
  useEffect(() => {
    if (typeTaskFilter === typeFilter.TODO) setTitle("To do");
    else if (typeTaskFilter === typeFilter.PROGRESS) setTitle("In progress");
    else if (typeTaskFilter === typeFilter.DONE) setTitle("DONE");
  }, [typeTaskFilter]);

  const getClassForType = (type: typeFilter) => {
    if (type === typeFilter.TODO) return styles.todo;
    if (type === typeFilter.PROGRESS) return styles.progress;
    if (type === typeFilter.DONE) return styles.done;
    return "";
  };

  return (
    <>
      <div className={styles.column}>
        <p
          className={`${getClassForType(typeTaskFilter)} ${styles.tasks__name}`}
        >
          {title}
        </p>
        <ul className={styles.list}>
          <FilteredTasks typeOfTask={typeTaskFilter} typeOfDevice="desktop" />
        </ul>
        <button className={styles.add__task} onClick={() => addTask("todo")}>
          <p data-color="todo">+</p>
        </button>
      </div>
    </>
  );
};

export default DisplayTasksInOneColumn;
