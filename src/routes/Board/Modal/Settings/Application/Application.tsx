import { useState } from "react";
import styles from "./Application.module.scss";
import FontFamily from "./FontFamily";
import FontSize from "./FontSize";
import Theme from "./Theme";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import Information from "./Information";

const Application = () => {
  const [isThemeOptionActive, setIsThemeOptionActive] = useState(false);
  const [isFontFamilyOptionActive, setIsFontFamilyOptionActive] =
    useState(false);
  const [isFontSizeOptionActive, setIsFontSizeOptionActive] = useState(false);
  const [isAppInfoActive, setIsAppInfoActive] = useState(false);

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

      {/* App info */}
      <div>
        <button
          type="button"
          onClick={() => setIsAppInfoActive(!isAppInfoActive)}
          className={styles.button}
        >
          <p>App details</p>
          {isAppInfoActive ? (
            <FaArrowDown size={16} />
          ) : (
            <FaArrowLeft size={16} />
          )}
        </button>
        {isAppInfoActive && <Information />}
      </div>
    </section>
  );
};

export default Application;
