import { useState } from "react";
import { ProfilePhoto } from "../../../helpers/ProfilePhoto";

import { useSafeUserContext } from "../../../context/AuthenticationContext";
import { useSafeSettingsContext } from "../../../context/Settings";
import { useAppSelector } from "../../../store/hooks";
import { selectCurrentDay } from "../../../store/reducers/calendar";
import { categoryBoardNav } from "../../../helpers/CategoryBoardNav";
import { useSafeModalContext } from "../../../context/ModalStates";

import { IoLogOut } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import styles from "./Header.module.scss";
import { CgClose } from "react-icons/cg";
import { Category } from "../../../types/task";

const Header = () => {
  const { user, SignOut, currentUserData } = useSafeUserContext();
  const { profileImage } = currentUserData;
  const { pickedTheme } = useSafeSettingsContext();
  const { typeCategory, changeCategory } = useSafeModalContext();
  const currentDay = useAppSelector(selectCurrentDay);

  const [isCategorySectionOpen, setIsCategorySectionOpen] = useState(false);

  const name = user.displayName?.split(" ")[0];

  const logout = () => {
    SignOut();
  };

  const iconColor = pickedTheme === "dark" ? "white" : "black";

  const handleCategory = (link: Category) => {
    changeCategory(link);
    setIsCategorySectionOpen(false);
  };

  return (
    <section className={styles.header}>
      <div className={styles.icons}>
        <button className={styles.button}>
          <ProfilePhoto profileImage={profileImage} />
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
            onClick={() => setIsCategorySectionOpen(true)}
          >
            <p>{typeCategory}</p>
            {!isCategorySectionOpen && <MdMenu />}
          </button>
          {isCategorySectionOpen && (
            <ul className={styles["category__links"]}>
              <button
                className={styles["category__close"]}
                onClick={() => setIsCategorySectionOpen(false)}
                style={{ color: iconColor }}
              >
                <CgClose size={48} />
              </button>
              {categoryBoardNav.map((category) => (
                <li
                  key={category.type}
                  className={styles["category__link"]}
                  onClick={() => handleCategory(category.type)}
                >
                  {category.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
