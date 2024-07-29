import { useSafeSettingsContext } from "../../../../../context/Settings";
import Indentation from "../Indentation";
import styles from "./Information.module.scss";

const Information = () => {
  const { pickedFont, pickedFontSize, pickedTheme } = useSafeSettingsContext();
  return (
    <Indentation>
      <section className={styles.container}>
        <div>
          <strong>Font family:</strong>
          <p>{pickedFont}</p>
        </div>
        <div>
          <strong>Font size:</strong>
          <p>{pickedFontSize}</p>
        </div>
        <div>
          <strong>Theme:</strong>
          <p>{pickedTheme}</p>
        </div>
        <div>
          <strong>App version:</strong>
          <p>{import.meta.env.VITE_REACT_APP_VERSION}</p>
        </div>
      </section>
    </Indentation>
  );
};

export default Information;
