export interface Subtask {
  title: string;
  isDone: boolean;
  id: number;
}

export interface Task {
  task: string;
  description: string;
  subtasks: Subtask[];
  date: string;
  rangeDateFrom: string;
  rangeDateTo: string;
  subtasksDone: boolean;
  typeOfTask: string;
  userId: string;
}

export type TypeOfModal = "task" | "edit" | "delete" | "add" | null;
