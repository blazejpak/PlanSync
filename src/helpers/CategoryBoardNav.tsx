import { MdWork } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { FaInfinity } from "react-icons/fa";
import { Category } from "../types/task";

export const categoryBoardNav = [
  { text: "Work", icon: <MdWork size={16} />, type: Category.WORK },
  { text: "Personal", icon: <IoPerson size={16} />, type: Category.PERSONAL },
  { text: "Family", icon: <FaUserFriends size={16} />, type: Category.FAMILY },
  { text: "All", icon: <FaInfinity size={16} />, type: Category.ALL },
];
