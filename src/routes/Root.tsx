import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContextProvider } from "../context/AuthenticationContext";
import { SettingsContextProvider } from "../context/Settings";
import { ResponsiveContextProvider } from "../context/responsive";
import { DateTime } from "luxon";
import { DatesZones } from "../types/dates";
import { ROUTES } from "../types/routes";
import { MessagesStatesProvider } from "../context/Messages";

const Root = () => {
  const time = DateTime.now().setLocale(DatesZones.LOCALE).toString();

  if (location.pathname === "/board")
    return <Navigate to={ROUTES.ROUTE_BOARD(time)} replace={true} />;

  return (
    <ResponsiveContextProvider>
      <SettingsContextProvider>
        <AuthenticationContextProvider>
          <MessagesStatesProvider>
            <Outlet />
          </MessagesStatesProvider>
        </AuthenticationContextProvider>
      </SettingsContextProvider>
    </ResponsiveContextProvider>
  );
};

export default Root;
