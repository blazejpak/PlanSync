import { useEffect, useState } from "react";

import {
  ModalContextProvider,
  useSafeModalContext,
} from "../../context/ModalStates";
import { useAppDispatch } from "../../store/hooks";
import { fetchAllTasks } from "../../store/reducers/tasks";
import { useSafeSettingsContext } from "../../context/Settings";

import TaskList from "./TaskList";
import CalendarPerDay from "../../components/dates/CalendarPerDay";

import styles from "./Board.module.scss";
import { useSafeUserContext } from "../../context/AuthenticationContext";
import { getPersonalData } from "../../utils/firebase/AuthService";
import Loading from "../Loading";
import Navigation from "../../components/navigation/Navigation";
import Statistics from "../../components/navigation/Statistics";

import { RiLogoutCircleLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { useSafeResponsiveContext } from "../../context/responsive";
import Mobile from "./mobile/Mobile";
import Desktop from "./desktop/Desktop";

const Board = () => {
  const { isMobile } = useSafeResponsiveContext();

  const { changeDarkTheme, changeFontFamily, changeFontSize } =
    useSafeSettingsContext();

  const { currentUserData } = useSafeUserContext();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <ModalContextProvider>
      {isMobile ? <Mobile /> : <Desktop />}
    </ModalContextProvider>
  );
};

export default Board;
