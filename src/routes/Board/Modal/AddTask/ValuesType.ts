export interface Subtask {
  title: string;
  isDone: boolean;
  id: number;
}

export interface ValuesTypes {
  task: string;
  description: string;
  subtasks: Subtask[];
  type: string;
  pickedRadioDate: string;
}
