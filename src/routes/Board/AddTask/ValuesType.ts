export interface ValuesTypes {
  task: string;
  description: string;
  subtasks: {
    title: string;
    isDone: boolean;
    id: number;
  }[];
  type: "progress" | "todo" | "done";
  pickedRadioDate: string;
}
