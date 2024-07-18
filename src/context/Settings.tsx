import { createContext, ReactNode, useContext, useState } from "react";

interface initialValueProps {
  isModalSettingsOpen: boolean;
  pickedTheme: "light" | "dark";
  pickedFont: "Rubik" | "Lora" | "Montserrat";
  pickedFontSize: "small" | "medium" | "large";

  switchSettingsModalActive: () => void;
  changeDarkTheme: (values: "light" | "dark") => void;
  changeFontFamily: (values: "Rubik" | "Lora" | "Montserrat") => void;
  changeFontSize: (values: "small" | "medium" | "large") => void;
  closeSettingsModal: () => void;
}

const initialValue: initialValueProps = {
  isModalSettingsOpen: false,
  pickedTheme: "light",
  pickedFont: "Rubik",
  pickedFontSize: "medium",

  switchSettingsModalActive: () => {},
  changeDarkTheme: () => {},
  changeFontFamily: () => {},
  changeFontSize: () => {},
  closeSettingsModal: () => {},
};

export const SettingsContext = createContext(initialValue);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const SettingsContextProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(
    initialValue.isModalSettingsOpen
  );
  const [pickedTheme, setPickedTheme] = useState(initialValue.pickedTheme);
  const [pickedFont, setPickedFont] = useState(initialValue.pickedFont);
  const [pickedFontSize, setPickedFontSize] = useState(
    initialValue.pickedFontSize
  );

  const switchSettingsModalActive = () => {
    setIsModalSettingsOpen(!isModalSettingsOpen);
  };

  const changeDarkTheme = (theme: "light" | "dark") => {
    setPickedTheme(theme);
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    document.body.classList.add(theme);
  };

  const changeFontFamily = (fontFamily: "Rubik" | "Lora" | "Montserrat") => {
    setPickedFont(fontFamily);
    document.documentElement.style.fontFamily = fontFamily;
  };

  const changeFontSize = (fontSize: "small" | "medium" | "large") => {
    setPickedFontSize(fontSize);
    document.body.classList.remove("small-font");
    document.body.classList.remove("medium-font");
    document.body.classList.remove("large-font");

    document.body.classList.add(fontSize + "-font");
  };

  const closeSettingsModal = () => {
    setIsModalSettingsOpen(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        switchSettingsModalActive,
        changeDarkTheme,
        changeFontFamily,
        changeFontSize,
        closeSettingsModal,
        isModalSettingsOpen,
        pickedTheme,
        pickedFont,
        pickedFontSize,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSafeSettingsContext = () => {
  const value = useContext(SettingsContext);
  if (value === undefined) {
    throw new Error("Context value is undefined");
  }
  return value;
};
