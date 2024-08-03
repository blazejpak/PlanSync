export interface Subtask {
  title: string;
  isDone: boolean;
  id: number;
}

export interface Task {
  id: string;
  task: string;
  description: string;
  category: string;
  subtasks: Subtask[];
  date: string;
  rangeDateFrom: string;
  rangeDateTo: string;
  subtasksDone: boolean;
  typeOfTask: string;
  userId: string;
}

export enum Category {
  WORK = "work",
  PERSONAL = "personal",
  FAMILY = "family",
  ALL = "all",
}

export enum typeFilter {
  TODO = "todo",
  PROGRESS = "progress",
  DONE = "done",
  ALL = "all",
}

export type TypeOfModal = "task" | "edit" | "delete" | "add" | null;

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
