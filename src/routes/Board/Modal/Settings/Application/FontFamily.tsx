import { useSafeSettingsContext } from "../../../../../context/Settings";
import styles from "./FontFamily.module.scss";

const FontFamily = () => {
  const { changeFontFamily, pickedFont } = useSafeSettingsContext();

  return (
    <div className={styles.content}>
      <strong className={styles.content__heading}>
        Pick your favorite font
      </strong>
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
  );
};

export default FontFamily;
