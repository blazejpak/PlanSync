import { LuListTodo } from "react-icons/lu";
import { GrInProgress } from "react-icons/gr";
import { MdDone } from "react-icons/md";

export const tasksBoardNav = [
  { text: "To do", icon: <LuListTodo size={16} /> },
  { text: "In progress", icon: <GrInProgress size={16} /> },
  { text: "Done", icon: <MdDone size={16} /> },
];
