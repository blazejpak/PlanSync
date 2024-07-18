import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./Theme.module.scss";

import { motion, useSpring } from "framer-motion";
import { useSafeSettingsContext } from "../../../../../context/Settings";

const Theme = () => {
  const { changeDarkTheme, pickedTheme } = useSafeSettingsContext();

  const spring = useSpring(0);

  const changeTheme = () => {
    if (pickedTheme === "light") {
      changeDarkTheme("dark");
    } else {
      changeDarkTheme("light");
    }
  };
  return (
    <div className={styles.content}>
      <strong className={styles.content__heading}>
        Change your color theme
      </strong>
      <div className={styles.button__theme}>
        <FaSun size={20} />
        <button
          className={`${styles.button__box} ${
            pickedTheme === "dark" && styles["button__box--active"]
          }`}
          onClick={changeTheme}
        >
          <motion.div
            layout
            transition={spring}
            className={`${styles.button__ball} ${
              pickedTheme === "dark" && styles["button__ball--active"]
            }`}
          ></motion.div>
        </button>
        <FaMoon size={20} />
      </div>
    </div>
  );
};

export default Theme;
