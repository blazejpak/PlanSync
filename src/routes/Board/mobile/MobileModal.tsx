import NavigationMobile from "../../../components/navigation/NavigationMobile";
import Settings from "../../../components/modals/Settings/Settings";

import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";

import styles from "./MobileModal.module.scss";
import { useSafeMobileContext } from "../../../context/MobileStates";
import MobileCalendar from "./MobileCalendar";

const MobileModal = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { typeOfPage } = useSafeMobileContext();

  return (
    <section className={`${styles.page} ${isStatisticsOpen ? "open" : ""} `}>
      {typeOfPage === "settings" && <Settings />}
      {typeOfPage === "calendar" && <MobileCalendar />}
      {typeOfPage === "newTask" && <Settings />}
      {typeOfPage === "messages" && <Settings />}

      <NavigationMobile />
    </section>
  );
};

export default MobileModal;
