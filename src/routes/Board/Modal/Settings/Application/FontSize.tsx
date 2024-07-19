import { useSafeSettingsContext } from "../../../../../context/Settings";
import Indentation from "../Indentation";
import styles from "./FontSize.module.scss";

const FontSize = () => {
  const { changeFontSize, pickedFontSize } = useSafeSettingsContext();

  return (
    <Indentation>
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
    </Indentation>
  );
};

export default FontSize;
