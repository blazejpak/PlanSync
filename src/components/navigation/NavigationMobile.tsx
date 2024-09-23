import {
  IoSettingsOutline,
  IoCalendarClearOutline,
  IoHomeOutline,
  IoAddCircleOutline,
} from "react-icons/io5";

import styles from "./NavigationMobile.module.scss";

const NavigationMobile = () => {
  return (
    <footer className={styles.footer}>
      <button>
        <IoSettingsOutline />
      </button>
      <button>
        <IoCalendarClearOutline />
      </button>
      <button>
        <IoHomeOutline />
      </button>
    </footer>
  );
};

export default NavigationMobile;
