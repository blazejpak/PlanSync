import { createContext, ReactNode, useContext, useState } from "react";
import { typeOfPageProps } from "../types/mobile";

interface initialValueProps {
  typeOfPage: typeOfPageProps;

  changeTypeOfPage: (value: typeOfPageProps) => void;
}

const initialValue: initialValueProps = {
  typeOfPage: "home",

  changeTypeOfPage: () => {},
};

export const MobileStatesContext = createContext(initialValue);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const MobileStatesProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [typeOfPage, setTypeOfPage] = useState(initialValue.typeOfPage);

  const changeTypeOfPage = (value: typeOfPageProps) => {
    setTypeOfPage(value);
  };

  return (
    <MobileStatesContext.Provider
      value={{
        typeOfPage,
        changeTypeOfPage,
      }}
    >
      {children}
    </MobileStatesContext.Provider>
  );
};

export const useSafeMobileContext = () => {
  const value = useContext(MobileStatesContext);
  if (value === undefined) {
    throw new Error("Context value is undefined");
  }
  return value;
};
