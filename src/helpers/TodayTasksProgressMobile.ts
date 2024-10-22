import { Task } from "../types/task";

export const todayTasksProgressMobile = (
  data: Task[],
  typeOfTasks: "todo" | "progress" | "done"
) => {
  const tasks = data.filter((item) => item.typeOfTask === typeOfTasks);
  const tasksDone = data.filter(
    (item) => item.typeOfTask === typeOfTasks && item.subtasksDone
  );
  const countPercentTasks = (tasksDone.length / tasks.length) * 100;

  return countPercentTasks;
};
