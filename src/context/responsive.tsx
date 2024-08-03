import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ModalContextType {
  isMobile: boolean;
}

const initialData: ModalContextType = {
  isMobile: false,
};

export const ResponsiveContext = createContext<ModalContextType>(initialData);

interface ChildrenContextProviderType {
  children: ReactNode;
}

export const ResponsiveContextProvider = ({
  children,
}: ChildrenContextProviderType) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handlerResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handlerResize);
    handlerResize();

    return () => mediaQuery.removeEventListener("change", handlerResize);
  }, []);

  return (
    <ResponsiveContext.Provider
      value={{
        isMobile,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useSafeResponsiveContext = () => {
  const value = useContext(ResponsiveContext);
  if (value === undefined) {
    throw new Error("Context value is undefined");
  }
  return value;
};
