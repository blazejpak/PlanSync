import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Board from "./Board";
import { useSafeResponsiveContext } from "../../context/responsive";
import NavigationMobile from "../../components/navigation/NavigationMobile";

import styles from "./BoardWrapper.module.scss";
import { useSafeUserContext } from "../../context/AuthenticationContext";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllTasksByUser,
  selectAreTasksLoaded,
} from "../../store/reducers/tasks";
import { useEffect } from "react";
import { ROUTES } from "../../types/routes";
import { pickCurrentDay } from "../../store/reducers/calendar";
import { DateTime } from "luxon";

const BoardWrapper = () => {
  const { isMobile } = useSafeResponsiveContext();
  const { currentUserData } = useSafeUserContext();

  const areTasksLoaded = useAppSelector(selectAreTasksLoaded);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { boardId } = useParams<{ boardId: string }>();

  const today = DateTime.now().toISODate();
  const navigate = useNavigate();
  if (!boardId) navigate(ROUTES.ROUTE_BOARD(today), { replace: true });

  useEffect(() => {
    if (currentUserData.userId && !areTasksLoaded) {
      dispatch(fetchAllTasksByUser(currentUserData.userId));
    }
  }, [currentUserData, areTasksLoaded]);

  useEffect(() => {
    if (boardId) {
      const dateChecker = DateTime.fromISO(boardId);
      if (dateChecker.isValid) {
        dispatch(pickCurrentDay(boardId));
      } else {
        dispatch(pickCurrentDay(today));
        navigate(ROUTES.ROUTE_BOARD(today), { replace: true });
      }
    }
  }, [boardId]);

  return isMobile ? (
    <div className={styles.page}>
      {boardId && location.pathname === ROUTES.ROUTE_BOARD(boardId) ? (
        <Board />
      ) : (
        <Outlet />
      )}
      <NavigationMobile />
    </div>
  ) : (
    <>
      <Board />

      <Outlet />
    </>
  );
};

export default BoardWrapper;
