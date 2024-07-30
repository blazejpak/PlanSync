import { LuListTodo } from "react-icons/lu";
import { GrInProgress } from "react-icons/gr";
import { MdDone } from "react-icons/md";
import { FaInfinity } from "react-icons/fa";
import { typeFilter } from "../types/task";

export const tasksBoardNav = [
  { text: "To do", icon: <LuListTodo size={16} />, type: typeFilter.TODO },
  {
    text: "In progress",
    icon: <GrInProgress size={16} />,
    type: typeFilter.PROGRESS,
  },
  { text: "Done", icon: <MdDone size={16} />, type: typeFilter.DONE },
  { text: "All", icon: <FaInfinity size={16} />, type: typeFilter.ALL },
];
