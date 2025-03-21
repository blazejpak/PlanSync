import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PickedFont, PickedFontSize, PickedTheme } from "../types/settings";

interface initialValueProps {
  isModalSettingsOpen: boolean;
  pickedTheme: PickedTheme;
  pickedFont: PickedFont;
  pickedFontSize: PickedFontSize;

  changeSettingsModalActive: (value: true | false) => void;
  changeDarkTheme: (values: PickedTheme) => void;
  changeFontFamily: (values: PickedFont) => void;
  changeFontSize: (values: PickedFontSize) => void;
  closeSettingsModal: () => void;
}

const initialValue: initialValueProps = {
  isModalSettingsOpen: false,
  pickedTheme: "light",
  pickedFont: "Rubik",
  pickedFontSize: "medium",

  changeSettingsModalActive: () => {},
  changeDarkTheme: () => {},
  changeFontFamily: () => {},
  changeFontSize: () => {},
  closeSettingsModal: () => {},
};

export const SettingsContext = createContext(initialValue);

interface ChildrenContextProviderType {
  children: ReactNode;
}

const clearClass = (className: string) => {
  document.body.classList.remove(className);
};

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

  useEffect(() => {
    const theme = localStorage.getItem("theme") as PickedTheme;
    const fontFamily = localStorage.getItem("fontFamily") as PickedFont;
    const fontSize = localStorage.getItem("fontSize") as PickedFontSize;

    if (theme) changeDarkTheme(theme);
    if (fontFamily) changeFontFamily(fontFamily);
    if (fontSize) changeFontSize(fontSize);
  }, []);

  const changeSettingsModalActive = (value: true | false) => {
    setIsModalSettingsOpen(value);
  };

  const changeDarkTheme = (theme: PickedTheme) => {
    localStorage.setItem("theme", theme);
    setPickedTheme(theme);
    ["light", "dark"].forEach(clearClass);
    document.body.classList.add(theme);
  };

  const changeFontFamily = (fontFamily: PickedFont) => {
    localStorage.setItem("fontFamily", fontFamily);
    setPickedFont(fontFamily);
    document.documentElement.style.fontFamily = fontFamily;
  };

  const changeFontSize = (fontSize: PickedFontSize) => {
    localStorage.setItem("fontSize", fontSize);

    setPickedFontSize(fontSize);
    ["small-font", "medium-font", "large-font"].forEach(clearClass);
    document.body.classList.add(fontSize + "-font");
  };

  const closeSettingsModal = () => {
    setIsModalSettingsOpen(false);
  };

  return (
    <SettingsContext.Provider
      value={{
        changeSettingsModalActive,
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
