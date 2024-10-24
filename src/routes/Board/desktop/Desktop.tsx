import styles from "./Desktop.module.scss";
import Navigation from "../../../components/navigation/Navigation";
import CalendarPerDay from "../../../components/dates/CalendarPerDay";
import TaskList from "../TaskList";
import Statistics from "../../../components/statistics/desktop/Statistics";
import { useAppSelector } from "../../../store/hooks";
import { selectIsStatisticsOpen } from "../../../store/reducers/statistics";
import { useSafeModalContext } from "../../../context/ModalStates";
import ShowTask from "../../../components/modals/ShowTask/ShowTask";
import EditTask from "../../../components/modals/EditTask/EditTask";
import DeleteTask from "../../../components/modals/DeleteTask/DeleteTask";
import AddTask from "../../../components/modals/AddTask/AddTask";
import Overlay from "../../../components/modals/Overlay";

const Desktop = () => {
  const isStatisticsOpen = useAppSelector(selectIsStatisticsOpen);
  const { taskModal } = useSafeModalContext();

  return (
    <section
      className={`${styles.page} ${isStatisticsOpen ? styles.open : ""}`}
    >
      <Navigation />
      <section
        className={`${styles.board} ${isStatisticsOpen ? styles.open : ""}`}
      >
        <CalendarPerDay />
        <TaskList />
      </section>
      <Statistics />

      {taskModal.type === "task" && taskModal.isActive && (
        <Overlay>
          <ShowTask />
        </Overlay>
      )}

      {taskModal.type === "edit" && taskModal.isActive && (
        <Overlay>
          <EditTask />
        </Overlay>
      )}

      {taskModal.type === "delete" && taskModal.isActive && (
        <Overlay>
          <DeleteTask />
        </Overlay>
      )}

      {taskModal.type === "add" && taskModal.isActive && (
        <Overlay>
          <AddTask />
        </Overlay>
      )}
    </section>
  );
};

export default Desktop;
