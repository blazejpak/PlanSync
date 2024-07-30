import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Category, Task, typeFilter, TypeOfModal } from "../types/task";

interface ModalContextType {
  typeCategory: Category;
  typeTaskFilter: typeFilter;
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
  changeCategory: (type: Category) => void;
  changeTypeFilter: (type: typeFilter) => void;
}

const initialData: ModalContextType = {
  typeCategory: Category.ALL,
  typeTaskFilter: typeFilter.ALL,
  taskModal: {
    type: "task",
    prop: null,
    activeTaskData: null,
    isActive: false,
  },
  setTaskModal: () => {},
  closeModal: () => {},
  changeCategory: () => {},
  changeTypeFilter: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialData);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const ModalContextProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [taskModal, setTaskModal] = useState(initialData.taskModal);
  const [typeCategory, setTypeCategory] = useState(initialData.typeCategory);
  const [typeTaskFilter, setTypeTaskFilter] = useState(
    initialData.typeTaskFilter
  );

  const closeModal = () => {
    setTaskModal({
      type: null,
      isActive: false,
      activeTaskData: null,
      prop: null,
    });
  };

  const changeCategory = (type: Category) => {
    setTypeCategory(type);
  };

  const changeTypeFilter = (type: typeFilter) => {
    setTypeTaskFilter(type);
  };

  return (
    <ModalContext.Provider
      value={{
        typeTaskFilter,
        typeCategory,
        taskModal,
        setTaskModal,
        closeModal,
        changeCategory,
        changeTypeFilter,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useSafeModalContext = () => {
  const value = useContext(ModalContext);
  if (value === undefined) {
    throw new Error("Context value is undefined");
  }
  return value;
};
