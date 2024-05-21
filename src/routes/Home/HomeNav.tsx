import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";
import { MdMenu } from "react-icons/md";

import styles from "./HomeNav.module.scss";
import { ROUTES } from "../../utils/routes";
import { useRef, useState } from "react";
import useClickOutside from "../../components/helpers/useClickOutside";

const HomeNav = () => {
  const [menuActive, setMenuActive] = useState(false);

  const refMenu = useRef<HTMLDivElement>(null);
  useClickOutside({ ref: refMenu, callback: () => setMenuActive(false) });

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.ROUTE_HOME}>
          <img src={logo} height={48} />
        </NavLink>

        <div className={styles["nav-computer"]}>
          <NavLink to={ROUTES.ROUTE_SIGN_IN} className={styles.button}>
            Sign in
          </NavLink>
          <NavLink to={ROUTES.ROUTE_SIGN_UP} className={styles.button}>
            Sign up
          </NavLink>
        </div>

        <div className={styles["nav-mobile"]} ref={refMenu}>
          <button onClick={() => setMenuActive((prev) => !prev)}>
            <MdMenu size={32} />
          </button>

          {menuActive && (
            <div className={styles.menu}>
              <NavLink to={ROUTES.ROUTE_SIGN_IN} className={styles.button}>
                Sign in
              </NavLink>
              <NavLink to={ROUTES.ROUTE_SIGN_UP} className={styles.button}>
                Sign up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HomeNav;
