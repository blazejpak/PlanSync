export interface TaskType {
  uid: string;
  task: string;
  description: string;
  subtasks: {
    title: string;
    isDone: boolean;
    id: number;
  }[];
  date: string;
  subtasksDone: boolean;
  typeOfTask: string;
  userId: number;
}
