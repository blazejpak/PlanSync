import { ReactNode, createContext, useState } from "react";
import { TaskType } from "../helpers/types";

interface ModalContextType {
  isTaskMobileActive: boolean;
  setIsTaskMobileActive: (value: boolean) => void;
  activeTaskData: TaskType | null;
  setActiveTaskData: (value: TaskType | null) => void;
  day: string;
  setDay: (value: string) => void;
}

const initialData: ModalContextType = {
  isTaskMobileActive: false,
  setIsTaskMobileActive: () => {},
  activeTaskData: null,
  setActiveTaskData: () => {},
  day: "",
  setDay: () => {},
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
  const [day, setDay] = useState("");

  return (
    <ModalContext.Provider
      value={{
        day,
        setDay,
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
