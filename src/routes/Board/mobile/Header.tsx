import { IoLogOut } from "react-icons/io5";
import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { ProfilePhoto } from "../../../helpers/ProfilePhoto";
import styles from "./Header.module.scss";
import { useSafeSettingsContext } from "../../../context/Settings";
import { useAppSelector } from "../../../store/hooks";
import { selectCurrentDay } from "../../../store/reducers/calendar";

import { FaArrowLeft, FaArrowDown } from "react-icons/fa";
import { useSafeModalContext } from "../../../context/ModalStates";
import { useState } from "react";

const Header = () => {
  const { user, SignOut } = useSafeUserContext();
  const { pickedTheme } = useSafeSettingsContext();
  const { typeCategory } = useSafeModalContext();
  const currentDay = useAppSelector(selectCurrentDay);

  const [isCategorySectionOpen, setIsCategorySectionOpen] = useState(false);

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
        <strong>{currentDay}</strong>
        <button
          className={styles.button}
          onClick={logout}
          style={{ color: iconColor }}
        >
          <IoLogOut size={48} />
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.text}>
          <h1 className={styles.heading}>Hello {name}!</h1>
          <p className={styles.paragraph}>
            Let's make a plan of your tasks today.
          </p>
        </div>

        <div className={styles.category}>
          <button
            className={styles["category__button"]}
            onClick={() => setIsCategorySectionOpen((prev) => !prev)}
          >
            <p>{typeCategory}</p>
            {isCategorySectionOpen ? <FaArrowDown /> : <FaArrowLeft />}
          </button>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Header;
