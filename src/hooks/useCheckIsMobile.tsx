import { DateTime } from "luxon";
import { useSafeResponsiveContext } from "../context/responsive";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../types/routes";

const today = DateTime.now().toISODate();

const useCheckIsMobile = () => {
  const { isMobile } = useSafeResponsiveContext();
  const navigate = useNavigate();

  if (!isMobile) {
    navigate(ROUTES.ROUTE_BOARD(today), { replace: true });
  }
};

export default useCheckIsMobile;
