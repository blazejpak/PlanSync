import { ReactNode, createContext, useState } from "react";
import { Task } from "../helpers/types";

interface ModalContextType {
  isTaskMobileActive: boolean;
  setIsTaskMobileActive: (value: boolean) => void;
  activeTaskData: Task | null;
  setActiveTaskData: (value: Task | null) => void;
}

const initialData: ModalContextType = {
  isTaskMobileActive: false,
  setIsTaskMobileActive: () => {},
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
  const [activeTaskData, setActiveTaskData] = useState(
    initialData.activeTaskData
  );

  return (
    <ModalContext.Provider
      value={{
        isTaskMobileActive,
        setIsTaskMobileActive,
        activeTaskData,
        setActiveTaskData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
