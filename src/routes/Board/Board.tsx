import { ModalContextProvider } from "../../context/ModalStates";

import { useSafeResponsiveContext } from "../../context/responsive";
import Desktop from "./desktop/Desktop";
import Mobile from "./mobile/Mobile";
import { MobileStatesProvider } from "../../context/MobileStates";
import { GetSettingsData } from "../../helpers/GetSettingsData";

const Board = () => {
  GetSettingsData();
  const { isMobile } = useSafeResponsiveContext();

  return (
    <ModalContextProvider>
      {isMobile ? (
        <MobileStatesProvider>
          <Mobile />
        </MobileStatesProvider>
      ) : (
        <Desktop />
      )}
    </ModalContextProvider>
  );
};

export default Board;
