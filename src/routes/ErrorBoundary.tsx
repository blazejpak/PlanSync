import { DateTime } from "luxon";
import { DatesZones } from "../types/dates";
import { ROUTES } from "../types/routes";
import { Navigate, useLocation, useParams } from "react-router-dom";

const ErrorBoundary = () => {
  const time = DateTime.now().setLocale(DatesZones.LOCALE).toISODate();
  const { boardId } = useParams<{ boardId: string }>();
  const path = useLocation().pathname;

  if (!boardId || path === "/board") {
    return <Navigate to={`${ROUTES.ROUTE_BOARD(time)}`} replace={true} />;
  }

  return <div>ErrorBoundary</div>;
};

export default ErrorBoundary;
