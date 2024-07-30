import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";
import Button from "../button/Button";

import { useSafeModalContext } from "../../context/ModalStates";

import logo from "../../assets/logo.webp";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const { setTaskModal } = useSafeModalContext();

  const handleButtonClick = () => {
    setTaskModal({
      type: "add",
      prop: "todo",
      activeTaskData: null,
      isActive: true,
    });
  };

  return (
    <section className={styles.container}>
      <nav className={styles.navigation}>
        <img alt="logo" src={logo} height={50} className={styles.image} />

        <SmallScreen />
        <LargeScreen />

        <Button
          type="button"
          typeOfButton={null}
          className={styles.button}
          onClick={handleButtonClick}
        >
          + Add new task
        </Button>
      </nav>
    </section>
  );
};

export default Navigation;
