import { DateTime } from "luxon";
import { useSafeResponsiveContext } from "../context/responsive";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../types/routes";

export const CheckIsMobile = () => {
  const { isMobile } = useSafeResponsiveContext();
  const today = DateTime.now().toISODate();
  if (!isMobile) {
    return <Navigate to={ROUTES.ROUTE_BOARD(today)} replace={true} />;
  }
};
