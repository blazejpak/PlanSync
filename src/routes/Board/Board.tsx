import { ModalContextProvider } from "../../context/ModalStates";
import Tasks from "./Tasks";

const Board = () => {
  return (
    <div>
      <ModalContextProvider>
        <Tasks />
      </ModalContextProvider>
    </div>
  );
};

export default Board;
