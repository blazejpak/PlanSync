import { useSafeModalContext } from "../../context/ModalStates";
import { useAppSelector } from "../../store/hooks";
import TaskItem from "./TaskItem";

import styles from "./FilteredTasks.module.scss";
import {
  dataFromTheCurrentDay,
  getFetchStatus,
} from "../../store/reducers/tasks";
import { Skeleton } from "@mui/material";

type FilteredTasksProps = {
  typeOfTask: "todo" | "progress" | "done";
  typeOfDevice: "desktop" | "mobile";
};

const FilteredTasks = ({ typeOfTask, typeOfDevice }: FilteredTasksProps) => {
  const { setTaskModal } = useSafeModalContext();

  const data = useAppSelector(dataFromTheCurrentDay);
  const dataStatus = useAppSelector(getFetchStatus);

  const filteredTasks = data.filter((item) => item.typeOfTask === typeOfTask);

  if (filteredTasks.length === 0 && typeOfDevice === "mobile") {
    return <p>Can't find any data</p>;
  }

  if (dataStatus === "failed") return <p>Something went wrong</p>;

  return dataStatus === "loading" ? (
    <Skeleton variant="rounded" height={100} style={{ marginTop: "2rem" }} />
  ) : (
    filteredTasks.map((task) => {
      return (
        <li
          className={`${typeOfDevice === "mobile" && styles.task}`}
          key={task.id}
          onClick={() => {
            setTaskModal({
              type: "task",
              prop: null,
              activeTaskData: task,
              isActive: true,
            });
          }}
        >
          <TaskItem data={task} />
        </li>
      );
    })
  );
};

export default FilteredTasks;
