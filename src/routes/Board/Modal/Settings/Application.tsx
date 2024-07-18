import { useSafeSettingsContext } from "../../../../context/Settings";
import { FaMoon, FaSun } from "react-icons/fa";

import styles from "./Application.module.scss";
import { motion, useSpring } from "framer-motion";

const Application = () => {
  const {
    changeFontFamily,
    changeFontSize,
    changeDarkTheme,
    pickedTheme,
    pickedFont,
    pickedFontSize,
  } = useSafeSettingsContext();

  const spring = useSpring(0);

  const changeTheme = () => {
    if (pickedTheme === "light") {
      changeDarkTheme("dark");
    } else {
      changeDarkTheme("light");
    }
  };

  return (
    <div className={styles.container}>
      {/* THEME */}
      <div className={styles.content}>
        <strong className={styles.content__heading}>Theme:</strong>
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

      {/* FONT-FAMILY */}
      <div className={styles.content}>
        <strong className={styles.content__heading}>Font</strong>
        <div className={styles.button__fonts}>
          <button
            className={`${styles.button__font} ${
              pickedFont === "Rubik" && styles["button__font--active"]
            }`}
            onClick={() => changeFontFamily("Rubik")}
          >
            Rubik
          </button>
          <button
            className={`${styles.button__font} ${
              pickedFont === "Lora" && styles["button__font--active"]
            }`}
            onClick={() => changeFontFamily("Lora")}
          >
            Lora
          </button>
          <button
            className={`${styles.button__font} ${
              pickedFont === "Montserrat" && styles["button__font--active"]
            }`}
            onClick={() => changeFontFamily("Montserrat")}
          >
            Montserrat
          </button>
        </div>
      </div>

      {/* FONT-SIZE */}
      <div className={styles.content}>
        <strong className={styles.content__heading}>
          Change size of letters
        </strong>
        <div className={styles["button__fonts-size"]}>
          <button
            className={`${styles["button__font-size"]} ${
              pickedFontSize === "small" && styles["button__font-size--active"]
            }`}
            onClick={() => changeFontSize("small")}
          >
            SMALL
          </button>
          <button
            className={`${styles["button__font-size"]} ${
              pickedFontSize === "medium" && styles["button__font-size--active"]
            }`}
            onClick={() => changeFontSize("medium")}
          >
            MEDIUM
          </button>
          <button
            className={`${styles["button__font-size"]} ${
              pickedFontSize === "large" && styles["button__font-size--active"]
            }`}
            onClick={() => changeFontSize("large")}
          >
            LARGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Application;
