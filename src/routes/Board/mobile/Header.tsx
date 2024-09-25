import { IoLogOut } from "react-icons/io5";
import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { ProfilePhoto } from "../../../helpers/ProfilePhoto";
import styles from "./Header.module.scss";
import { useSafeSettingsContext } from "../../../context/Settings";

const Header = () => {
  const { user, SignOut } = useSafeUserContext();
  const { pickedTheme } = useSafeSettingsContext();

  const name = user.displayName?.split(" ")[0];

  const logout = () => {
    SignOut();
  };

  const iconColor = pickedTheme === "dark" ? "white" : "black";

  return (
    <section className={styles.header}>
      <div className={styles.icons}>
        <button className={styles.button}>
          <ProfilePhoto />
        </button>
        <button
          className={styles.button}
          onClick={logout}
          style={{ color: iconColor }}
        >
          <IoLogOut size={48} />
        </button>
      </div>

      <div className={styles.text}>
        <h1 className={styles.heading}>Hello {name}!</h1>
        <p className={styles.paragraph}>
          Let's make a plan of your tasks today.
        </p>
      </div>
    </section>
  );
};

export default Header;
