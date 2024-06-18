import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { TaskType } from "../helpers/types";

interface ModalContextType {
  isTaskMobileActive: boolean;
  setIsTaskMobileActive: Dispatch<SetStateAction<boolean>>;
  isTaskDesktopActive: boolean;
  setIsTaskDesktopActive: Dispatch<SetStateAction<boolean>>;
  newTaskModal: {
    isActive: boolean;
    typeOfTask: "todo" | "progress" | "done";
  };
  setNewTaskModal: Dispatch<
    SetStateAction<{
      isActive: boolean;
      typeOfTask: "todo" | "progress" | "done";
    }>
  >;
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
  newTaskModal: { isActive: false, typeOfTask: "todo" },
  setNewTaskModal: () => {},
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
  const [newTaskModal, setNewTaskModal] = useState(initialData.newTaskModal);
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
        newTaskModal,
        setNewTaskModal,
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
