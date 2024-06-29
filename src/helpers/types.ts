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
  rangeDateFrom: string;
  rangeDateTo: string;
  subtasksDone: boolean;
  typeOfTask: string;
  userId: string;
}
