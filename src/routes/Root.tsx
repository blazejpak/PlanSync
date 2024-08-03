import { Outlet } from "react-router-dom";
import { AuthenticationContextProvider } from "../context/AuthenticationContext";
import { SettingsContextProvider } from "../context/Settings";
import { ResponsiveContextProvider } from "../context/responsive";

const Root = () => {
  return (
    <ResponsiveContextProvider>
      <SettingsContextProvider>
        <AuthenticationContextProvider>
          <Outlet />
        </AuthenticationContextProvider>
      </SettingsContextProvider>
    </ResponsiveContextProvider>
  );
};

export default Root;
