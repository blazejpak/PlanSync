import { useEffect, useState } from "react";
import TaskMobile from "./mobile/TaskMobile";
import TasksDesktop from "./desktop/TasksDesktop";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentDay } from "../../store/reducers/calendar";
import { DateTime, Interval } from "luxon";
import { dailyData, getAllData } from "../../store/reducers/tasks";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const day = useAppSelector(getCurrentDay);
  const getData = useAppSelector(getAllData);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handlerResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handlerResize);
    handlerResize();

    return () => window.removeEventListener("resize", handlerResize);
  }, []);

  useEffect(() => {
    if (getData.length > 0) {
      const newData = getData.filter((item) => {
        const dateFrom = DateTime.fromISO(item.rangeDateFrom).startOf("day");
        const dateTo = DateTime.fromISO(item.rangeDateTo).endOf("day");
        const interval = Interval.fromDateTimes(dateFrom, dateTo);

        return interval.contains(DateTime.fromISO(day).startOf("day"));
      });
      dispatch(dailyData(newData));
    }
  }, [getData, day]);

  return <>{isMobile ? <TaskMobile /> : <TasksDesktop />}</>;
};

export default TaskList;
