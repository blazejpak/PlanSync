import { Skeleton } from "@mui/material";

import TaskItem from "./TaskItem";

import { Status } from "../../types/task";
import { useSafeModalContext } from "../../context/ModalStates";
import { useAppSelector } from "../../store/hooks";
import {
  selectDataFromTheCurrentDay,
  selectFetchStatus,
} from "../../store/reducers/tasks";

import styles from "./FilteredTasks.module.scss";

type FilteredTasksProps = {
  typeOfTask: "todo" | "progress" | "done";
  typeOfDevice: "desktop" | "mobile";
};

const FilteredTasks = ({ typeOfTask, typeOfDevice }: FilteredTasksProps) => {
  const { setTaskModal } = useSafeModalContext();

  const data = useAppSelector(selectDataFromTheCurrentDay);
  const dataStatus = useAppSelector(selectFetchStatus);

  const filteredTasks = data.filter((item) => item.typeOfTask === typeOfTask);

  if (filteredTasks.length === 0 && typeOfDevice === "mobile") {
    return <p>Can't find any data</p>;
  }

  if (dataStatus === Status.FAILED) return <p>Something went wrong</p>;

  if (dataStatus === Status.LOADING) {
    return (
      <Skeleton variant="rounded" height={100} style={{ marginTop: "2rem" }} />
    );
  }
  return filteredTasks.map((task) => {
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
  });
};

export default FilteredTasks;
