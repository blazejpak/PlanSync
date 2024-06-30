import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { TaskType } from "../helpers/types";

interface ModalContextType {
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  typeTaskModal: {
    type: "task" | "edit" | "delete" | "add" | null;
    prop: string | null;
  };
  setTypeTaskModal: (value: {
    type: "task" | "edit" | "delete" | "add" | null;
    prop: string | null;
  }) => void;
  activeTask: TaskType | null;
  setActiveTask: Dispatch<SetStateAction<TaskType | null>>;
}

const initialData: ModalContextType = {
  isModalActive: false,
  setIsModalActive: () => {},
  typeTaskModal: { type: "task", prop: null },
  setTypeTaskModal: () => {},
  activeTask: null,
  setActiveTask: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialData);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [isModalActive, setIsModalActive] = useState(initialData.isModalActive);
  const [typeTaskModal, setTypeTaskModal] = useState(initialData.typeTaskModal);
  const [activeTask, setActiveTask] = useState(initialData.activeTask);

  return (
    <ModalContext.Provider
      value={{
        isModalActive,
        setIsModalActive,
        typeTaskModal,
        setTypeTaskModal,
        activeTask,
        setActiveTask,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
