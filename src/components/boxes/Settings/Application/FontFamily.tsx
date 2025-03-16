import { useSafeUserContext } from "../../../../context/AuthenticationContext";
import { useSafeSettingsContext } from "../../../../context/Settings";

import Indentation from "../Indentation";
import styles from "./FontFamily.module.scss";

const FontFamily = () => {
  const { changeFontFamily, pickedFont } = useSafeSettingsContext();
  const { UpdateUserData, currentUserData } = useSafeUserContext();

  const pickFontFamily = (fontFamily: "Rubik" | "Lora" | "Montserrat") => {
    changeFontFamily(fontFamily);
    UpdateUserData({
      ...currentUserData,
      appSettings: { ...currentUserData.appSettings, fontFamily },
    });
  };

  return (
    <Indentation>
      <strong className={styles.content__heading}>
        Pick your favorite font
      </strong>
      <div className={styles.button__fonts}>
        <button
          className={`${styles.button__font} ${
            pickedFont === "Rubik" && styles["button__font--active"]
          }`}
          onClick={() => pickFontFamily("Rubik")}
        >
          Rubik
        </button>
        <button
          className={`${styles.button__font} ${
            pickedFont === "Lora" && styles["button__font--active"]
          }`}
          onClick={() => pickFontFamily("Lora")}
        >
          Lora
        </button>
        <button
          className={`${styles.button__font} ${
            pickedFont === "Montserrat" && styles["button__font--active"]
          }`}
          onClick={() => pickFontFamily("Montserrat")}
        >
          Montserrat
        </button>
      </div>
    </Indentation>
  );
};

export default FontFamily;
