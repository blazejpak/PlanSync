import { useEffect, useState } from "react";

import { ModalContextProvider } from "../../context/ModalStates";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllTasksByUser,
  selectAreTasksLoaded,
} from "../../store/reducers/tasks";
import { useSafeSettingsContext } from "../../context/Settings";

import { useSafeUserContext } from "../../context/AuthenticationContext";
import { getPersonalData } from "../../utils/firebase/AuthService";

import { useSafeResponsiveContext } from "../../context/responsive";
import Mobile from "./mobile/Mobile";
import Desktop from "./desktop/Desktop";
import { MobileStatesProvider } from "../../context/MobileStates";

const Board = () => {
  const { isMobile } = useSafeResponsiveContext();

  const { changeDarkTheme, changeFontFamily, changeFontSize } =
    useSafeSettingsContext();

  const { currentUserData } = useSafeUserContext();

  useEffect(() => {
    const getData = async () => {
      const userData = await getPersonalData(currentUserData.userId);

      if (userData) {
        changeDarkTheme(userData.appSettings.uiTheme);
        changeFontFamily(userData.appSettings.fontFamily);
        changeFontSize(userData.appSettings.fontSize);
      }
    };
    getData();
  }, [currentUserData.userId]);

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
