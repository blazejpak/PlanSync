import { useState } from "react";
import styles from "./Application.module.scss";
import FontFamily from "./FontFamily";
import FontSize from "./FontSize";
import Theme from "./Theme";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";

const Application = () => {
  const [isThemeOptionActive, setIsThemeOptionActive] = useState(false);
  const [isFontFamilyOptionActive, setIsFontFamilyOptionActive] =
    useState(false);
  const [isFontSizeOptionActive, setIsFontSizeOptionActive] = useState(false);

  return (
    <section className={styles.container}>
      {/* THEME */}

      <div>
        <button
          type="button"
          onClick={() => setIsThemeOptionActive(!isThemeOptionActive)}
          className={styles.button}
        >
          <p>Theme</p>
          {isThemeOptionActive ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </button>
        {isThemeOptionActive && <Theme />}
      </div>

      {/* FONT-FAMILY */}

      <div>
        <button
          type="button"
          onClick={() => setIsFontFamilyOptionActive(!isFontFamilyOptionActive)}
          className={styles.button}
        >
          <p>Font Family</p>
          {isFontFamilyOptionActive ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </button>
        {isFontFamilyOptionActive && <FontFamily />}
      </div>

      {/* FONT-SIZE */}

      <div>
        <button
          type="button"
          onClick={() => setIsFontSizeOptionActive(!isFontSizeOptionActive)}
          className={styles.button}
        >
          <p>Font Size</p>
          {isFontSizeOptionActive ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </button>
        {isFontSizeOptionActive && <FontSize />}
      </div>
    </section>
  );
};

export default Application;
