import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { selectAllData } from "../../../store/reducers/tasks";
import { Task } from "../../../types/task";
import { DateTime, Interval } from "luxon";

const today = DateTime.now().endOf("day");
const sevenDaysAgo = today.minus({ days: 7 });

const TasksWeek = () => {
  const [weekData, setWeekData] = useState<Task[]>([]);

  const data = useAppSelector(selectAllData);

  useEffect(() => {
    if (data.length <= 0) return;

    const newData = data.filter((item) => {
      const dateFrom = DateTime.fromISO(item.rangeDateFrom).startOf("day");
      const dateTo = DateTime.fromISO(item.rangeDateTo).endOf("day");
      const interval = Interval.fromDateTimes(dateFrom, dateTo);

      // console.log(today);
      // console.log(sevenDaysAgo);
      return interval.overlaps(Interval.fromDateTimes(sevenDaysAgo, today));
    });

    console.log(data);
    // console.log(newData);

    setWeekData(newData);
  }, [data]);

  console.log(weekData);

  return <div>TasksWeek</div>;
};

export default TasksWeek;
