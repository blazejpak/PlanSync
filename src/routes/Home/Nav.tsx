import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo-white.png";
import { MdMenu } from "react-icons/md";

import { ROUTES } from "../../types/routes";
import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { useSafeUserContext } from "../../context/AuthenticationContext";

import styles from "./Nav.module.scss";
import { DateTime } from "luxon";
import { DatesZones } from "../../types/dates";

const HomeNav = () => {
  let img = logo;

  if ((document.body.className = "dark")) {
    img = logoWhite;
  }

  const [menuActive, setMenuActive] = useState(false);
  const time = DateTime.now().setLocale(DatesZones.LOCALE).toISO().slice(0, 10);

  const refMenu = useRef<HTMLDivElement>(null);
  useClickOutside({ ref: refMenu, callback: () => setMenuActive(false) });
  const { user } = useSafeUserContext();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to={ROUTES.ROUTE_HOME}>
          <img src={img} className={styles.logo} alt="Logo" />
        </NavLink>

        {user?.email ? (
          <NavLink to={ROUTES.ROUTE_BOARD(time)} className={styles.button}>
            Check your planner
          </NavLink>
        ) : (
          <>
            <div className={styles["nav-desktop"]}>
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
          </>
        )}
      </nav>
    </header>
  );
};

export default HomeNav;
