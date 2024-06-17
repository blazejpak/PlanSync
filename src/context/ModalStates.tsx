import { ReactNode, createContext, useState } from "react";
import { TaskType } from "../helpers/types";

interface ModalContextType {
  isTaskMobileActive: boolean;
  setIsTaskMobileActive: (value: boolean) => void;
  isTaskDesktopActive: boolean;
  setIsTaskDesktopActive: (value: boolean) => void;
  typeTaskModal: "task" | "edit" | "delete";
  setTypeTaskModal: (value: "task" | "edit" | "delete") => void;
  activeTaskData: TaskType | null;
  setActiveTaskData: (value: TaskType | null) => void;
}

const initialData: ModalContextType = {
  isTaskMobileActive: false,
  setIsTaskMobileActive: () => {},
  isTaskDesktopActive: false,
  setIsTaskDesktopActive: () => {},
  typeTaskModal: "task",
  setTypeTaskModal: () => {},
  activeTaskData: null,
  setActiveTaskData: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialData);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [isTaskMobileActive, setIsTaskMobileActive] = useState(
    initialData.isTaskMobileActive
  );
  const [isTaskDesktopActive, setIsTaskDesktopActive] = useState(
    initialData.isTaskDesktopActive
  );
  const [typeTaskModal, setTypeTaskModal] = useState(initialData.typeTaskModal);
  const [activeTaskData, setActiveTaskData] = useState(
    initialData.activeTaskData
  );

  return (
    <ModalContext.Provider
      value={{
        isTaskMobileActive,
        setIsTaskMobileActive,
        isTaskDesktopActive,
        setIsTaskDesktopActive,
        typeTaskModal,
        setTypeTaskModal,
        activeTaskData,
        setActiveTaskData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
