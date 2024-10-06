import {
  IoSettingsOutline,
  IoCalendarClearOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FaPlus, FaRegMessage } from "react-icons/fa6";

import styles from "./NavigationMobile.module.scss";

const NavigationMobile = () => {
  const handleSettings = () => {};

  return (
    <footer className={styles.footer}>
      <button>
        <IoHomeOutline />
      </button>
      <button>
        <IoCalendarClearOutline />
      </button>
      <button className={styles.add__task}>
        <FaPlus />
      </button>
      <button>
        <IoSettingsOutline />
      </button>
      <button>
        <FaRegMessage />
      </button>
    </footer>
  );
};

export default NavigationMobile;
