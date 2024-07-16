export interface Subtask {
  title: string;
  isDone: boolean;
  id: number;
}

export interface Task {
  uid: string;
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

export interface TaskFilter extends Task {
  CategoryFilter: "work" | "personal" | "family" | "all";
  TypeTaskFilter: "todo" | "progress" | "done" | "all";
}

export type TypeOfModal = "task" | "edit" | "delete" | "add" | null;
