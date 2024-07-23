import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./Theme.module.scss";

import { motion } from "framer-motion";
import { useSafeSettingsContext } from "../../../../../context/Settings";
import Indentation from "../Indentation";

const Theme = () => {
  const { changeDarkTheme, pickedTheme } = useSafeSettingsContext();

  const changeTheme = () => {
    if (pickedTheme === "light") {
      changeDarkTheme("dark");
    } else {
      changeDarkTheme("light");
    }
  };
  return (
    <Indentation>
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
            initial={{ x: "0.4rem" }}
            animate={{ x: pickedTheme === "dark" ? "5.2rem" : "0.4rem" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${styles.button__ball} ${
              pickedTheme === "dark" && styles["button__ball--active"]
            }`}
          ></motion.div>
        </button>
        <FaMoon size={20} />
      </div>
    </Indentation>
  );
};

export default Theme;
