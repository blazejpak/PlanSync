import { Skeleton } from "@mui/material";

import TaskItem from "../TaskItem";

import { Status, Task, typeFilter } from "../../../types/task";
import { useSafeModalContext } from "../../../context/ModalStates";
import { useAppSelector } from "../../../store/hooks";
import {
  selectDataFromTheCurrentDay,
  selectFetchStatus,
} from "../../../store/reducers/tasks";

import styles from "./FilteredTasks.module.scss";
import { useEffect, useState } from "react";
import { selectCurrentDay } from "../../../store/reducers/calendar";

type FilteredTasksProps = {
  typeOfTask: Omit<typeFilter, "all">;
  typeOfDevice: "desktop" | "mobile";
};

const FilteredTasks = ({ typeOfTask, typeOfDevice }: FilteredTasksProps) => {
  const { setTaskModal, typeCategory } = useSafeModalContext();

  const data = useAppSelector(selectDataFromTheCurrentDay);
  const dataStatus = useAppSelector(selectFetchStatus);
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const currentDay = useAppSelector(selectCurrentDay);

  useEffect(() => {
    if (dataStatus === Status.SUCCEEDED) {
      let filteredTasks = data.filter((item) => item.typeOfTask === typeOfTask);

      if (typeCategory !== "all") {
        filteredTasks = filteredTasks.filter(
          (item) => item.category === typeCategory
        );
      }

      setFilteredData(filteredTasks);
    }
  }, [typeCategory, currentDay, typeOfTask, data]);

  if (filteredData.length === 0 && typeOfDevice === "mobile") {
    return <p>Can't find any data</p>;
  }

  if (dataStatus === Status.FAILED) return <p>Something went wrong</p>;

  if (dataStatus === Status.LOADING) {
    return (
      <Skeleton variant="rounded" height={100} style={{ marginTop: "2rem" }} />
    );
  }
  return filteredData.map((task) => {
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
