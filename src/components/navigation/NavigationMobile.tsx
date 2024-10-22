import {
  IoSettingsOutline,
  IoCalendarClearOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FaPlus, FaRegMessage } from "react-icons/fa6";

import styles from "./NavigationMobile.module.scss";
import { typeOfPageProps } from "../../types/mobile";
import { useSafeMobileContext } from "../../context/MobileStates";

const NavigationMobile = () => {
  const { changeTypeOfPage } = useSafeMobileContext();
  const { typeOfPage } = useSafeMobileContext();

  const handleSettings = (value: typeOfPageProps) => {
    changeTypeOfPage(value);
  };

  return (
    <footer className={styles.footer}>
      <button
        onClick={() => handleSettings("home")}
        className={`${typeOfPage === "home" && styles.active}`}
      >
        <IoHomeOutline />
      </button>
      <button
        onClick={() => handleSettings("calendar")}
        className={`${typeOfPage === "calendar" && styles.active}`}
      >
        <IoCalendarClearOutline />
      </button>
      <button
        className={`${styles.add__task} ${
          typeOfPage === "newTask" && styles.active
        }`}
        onClick={() => handleSettings("newTask")}
      >
        <FaPlus />
      </button>
      <button
        onClick={() => handleSettings("settings")}
        className={`${typeOfPage === "settings" && styles.active}`}
      >
        <IoSettingsOutline />
      </button>
      <button
        onClick={() => handleSettings("messages")}
        className={`${typeOfPage === "messages" && styles.active}`}
      >
        <FaRegMessage />
      </button>
    </footer>
  );
};

export default NavigationMobile;
