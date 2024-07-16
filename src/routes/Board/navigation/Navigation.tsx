import logo from "../../../assets/logo.png";

import styles from "./Navigation.module.scss";
import Button from "../../../components/button/Button";
import { useSafeModalContext } from "../../../context/ModalStates";
import LargeScreen from "./LargeScreen";
import SmallScreen from "./SmallScreen";

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
      <img alt="logo" src={logo} height={50} className={styles.image} />

      <nav className={styles.navigation}>
        <SmallScreen />
        <LargeScreen />

        <Button
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
