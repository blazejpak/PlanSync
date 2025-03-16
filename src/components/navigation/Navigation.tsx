import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";
import Button from "../button/Button";

import logo from "../../assets/logo-white.png";
import logoMobile from "../../assets/logo-mobile.png";
import styles from "./Navigation.module.scss";
import { useSafeResponsiveContext } from "../../context/responsive";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { isMobile } = useSafeResponsiveContext();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("add-task");
  };

  return (
    <section className={styles.container}>
      <nav className={styles.navigation}>
        {isMobile ? (
          <img
            alt="logo"
            src={logoMobile}
            height={50}
            className={styles.image}
          />
        ) : (
          <img alt="logo" src={logo} height={50} className={styles.image} />
        )}

        <SmallScreen />
        <LargeScreen />

        <Button
          type="button"
          typeOfButton={null}
          className={styles.button}
          onClick={handleButtonClick}
        >
          {isMobile ? "+" : "Add new task"}
        </Button>
      </nav>
    </section>
  );
};

export default Navigation;
