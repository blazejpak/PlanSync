import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface initialValueProps {
  isModalSettingsOpen: boolean;
  isDarkThemeActive: boolean;
  pickedFont: "Rubik" | "Lora" | "Montserrat";
  pickedFontSize: "small" | "medium" | "large";

  switchSettingsModalActive: () => void;
  switchDarkTheme: () => void;
  changeFontFamily: (values: "Rubik" | "Lora" | "Montserrat") => void;
  changeFontSize: (values: "small" | "medium" | "large") => void;
  closeSettingsModal: () => void;
}

const initialValue: initialValueProps = {
  isModalSettingsOpen: false,
  isDarkThemeActive: false,
  pickedFont: "Rubik",
  pickedFontSize: "medium",

  switchSettingsModalActive: () => {},
  switchDarkTheme: () => {},
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
  const [isDarkThemeActive, setIsDarkThemeActive] = useState(
    initialValue.isDarkThemeActive
  );
  const [pickedFont, setPickedFont] = useState(initialValue.pickedFont);
  const [pickedFontSize, setPickedFontSize] = useState(
    initialValue.pickedFontSize
  );

  const switchSettingsModalActive = () => {
    setIsModalSettingsOpen(!isModalSettingsOpen);
  };

  const switchDarkTheme = () => {
    setIsDarkThemeActive(!isDarkThemeActive);
  };

  const changeFontFamily = (fontFamily: "Rubik" | "Lora" | "Montserrat") => {
    setPickedFont(fontFamily);
  };

  const changeFontSize = (fontSize: "small" | "medium" | "large") => {
    setPickedFontSize(fontSize);
  };

  const closeSettingsModal = () => {
    setIsModalSettingsOpen(false);
  };

  useEffect(() => {
    document.documentElement.style.fontFamily = pickedFont;
  }, [pickedFont]);

  return (
    <SettingsContext.Provider
      value={{
        switchSettingsModalActive,
        switchDarkTheme,
        changeFontFamily,
        changeFontSize,
        closeSettingsModal,
        isModalSettingsOpen,
        isDarkThemeActive,
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
