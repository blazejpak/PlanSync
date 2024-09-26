import { DateTime, Interval } from "luxon";
import { Task } from "../types/task";

const today = DateTime.now().endOf("day");
const sevenDaysAgo = today.minus({ days: 7 });

export const WeekData = (data: Task[]) => {
  if (data.length <= 0) return;

  const newData = data.filter((item) => {
    const dateFrom = DateTime.fromISO(item.rangeDateFrom).startOf("day");
    const dateTo = DateTime.fromISO(item.rangeDateTo).endOf("day");
    const interval = Interval.fromDateTimes(dateFrom, dateTo);

    return interval.overlaps(Interval.fromDateTimes(sevenDaysAgo, today));
  });

  return newData;
};
