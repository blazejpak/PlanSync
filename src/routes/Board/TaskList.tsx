import { useEffect } from "react";
import { DateTime, Interval } from "luxon";

import { dailyData, selectAllData } from "../../store/reducers/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectCurrentDay } from "../../store/reducers/calendar";

import TaskMobile from "./mobile/TaskMobile";
import { useSafeResponsiveContext } from "../../context/responsive";
import TasksDesktop from "./desktop/TasksDesktop";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const day = useAppSelector(selectCurrentDay);
  const getData = useAppSelector(selectAllData);
  const { isMobile } = useSafeResponsiveContext();

  useEffect(() => {
    if (getData.length <= 0) return;

    const newData = getData.filter((item) => {
      const dateFrom = DateTime.fromISO(item.rangeDateFrom).startOf("day");
      const dateTo = DateTime.fromISO(item.rangeDateTo).endOf("day");
      const interval = Interval.fromDateTimes(dateFrom, dateTo);

      return interval.contains(DateTime.fromISO(day).startOf("day"));
    });
    dispatch(dailyData(newData));
  }, [getData, day]);

  return <>{isMobile ? <TaskMobile /> : <TasksDesktop />}</>;
};

export default TaskList;
