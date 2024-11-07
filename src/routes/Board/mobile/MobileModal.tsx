import NavigationMobile from "../../../components/navigation/NavigationMobile";
import Settings from "../../../components/modals/Settings/Settings";
import MobileCalendar from "./MobileCalendar";
import AddTask from "../../../components/modals/AddTask/AddTask";
import Messages from "./Messages";

import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";
import { useSafeMobileContext } from "../../../context/MobileStates";

import styles from "./MobileModal.module.scss";

const MobileModal = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { typeOfPage } = useSafeMobileContext();

  return (
    <section className={`${styles.page} ${isStatisticsOpen ? "open" : ""} `}>
      {typeOfPage === "settings" && <Settings />}
      {typeOfPage === "calendar" && <MobileCalendar />}
      {typeOfPage === "newTask" && <AddTask />}
      {typeOfPage === "messages" && <Messages />}

      <NavigationMobile />
    </section>
  );
};

export default MobileModal;
