import { useSafeResponsiveContext } from "../../../context/responsive";
import Overlay from "../Overlay";
import AddTaskModal from "./AddTaskModal";

const AddTask = () => {
  const { isMobile } = useSafeResponsiveContext();

  return isMobile ? (
    <AddTaskModal />
  ) : (
    <Overlay>
      <AddTaskModal />
    </Overlay>
  );
};

export default AddTask;
