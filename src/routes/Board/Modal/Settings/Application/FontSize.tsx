import { useSafeUserContext } from "../../../../../context/AuthenticationContext";
import { useSafeSettingsContext } from "../../../../../context/Settings";
import Indentation from "../Indentation";
import styles from "./FontSize.module.scss";

const FontSize = () => {
  const { changeFontSize, pickedFontSize } = useSafeSettingsContext();
  const { UpdateUserData, currentUserData } = useSafeUserContext();

  const pickFontSize = (fontSize: "small" | "medium" | "large") => {
    changeFontSize(fontSize);
    UpdateUserData({
      ...currentUserData,
      appSettings: { ...currentUserData.appSettings, fontSize: fontSize },
    });
  };

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
          onClick={() => pickFontSize("small")}
        >
          SMALL
        </button>
        <button
          className={`${styles["button__font-size"]} ${
            pickedFontSize === "medium" && styles["button__font-size--active"]
          }`}
          onClick={() => pickFontSize("medium")}
        >
          MEDIUM
        </button>
        <button
          className={`${styles["button__font-size"]} ${
            pickedFontSize === "large" && styles["button__font-size--active"]
          }`}
          onClick={() => pickFontSize("large")}
        >
          LARGE
        </button>
      </div>
    </Indentation>
  );
};

export default FontSize;
