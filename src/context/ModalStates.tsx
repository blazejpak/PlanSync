import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Task, TypeOfModal } from "../types/task";

interface ModalContextType {
  taskModal: {
    type: TypeOfModal;
    isActive: boolean;
    activeTaskData: Task | null;
    prop: string | null;
  };
  setTaskModal: Dispatch<
    SetStateAction<{
      type: TypeOfModal;
      isActive: boolean;
      activeTaskData: Task | null;
      prop: string | null;
    }>
  >;
  closeModal: () => void;
}

const initialData: ModalContextType = {
  taskModal: {
    type: "task",
    prop: null,
    activeTaskData: null,
    isActive: false,
  },
  setTaskModal: () => {},
  closeModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialData);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [taskModal, setTaskModal] = useState(initialData.taskModal);

  const closeModal = () => {
    setTaskModal({
      type: null,
      isActive: false,
      activeTaskData: null,
      prop: null,
    });
  };

  return (
    <ModalContext.Provider
      value={{
        taskModal,
        setTaskModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
