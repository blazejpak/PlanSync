import { useDroppable } from "@dnd-kit/core";

import styles from "./Droppable.module.scss";
import { ReactNode } from "react";

interface DroppableProps {
  id: string;
  title: "todo" | "progress" | "done";
  colorClass: "todo" | "progress" | "done";
  children: ReactNode;
  onAddTask: () => void;
}

const Droppable = ({
  id,
  title,
  colorClass,
  children,
  onAddTask,
}: DroppableProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className={styles.column} ref={setNodeRef}>
      <p className={`${styles[colorClass]} ${styles.tasks__name}`}>{title}</p>
      <ul className={styles.list}>{children}</ul>
      <button className={styles.add__task} onClick={onAddTask}>
        <p data-color={colorClass}>+</p>
      </button>
    </div>
  );
};

export default Droppable;
