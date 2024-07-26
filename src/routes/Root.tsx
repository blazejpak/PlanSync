import { Outlet } from "react-router-dom";
import { AuthenticationContextProvider } from "../context/AuthenticationContext";
import { SettingsContextProvider } from "../context/Settings";

const Root = () => {
  return (
    <SettingsContextProvider>
      <AuthenticationContextProvider>
        <Outlet />
      </AuthenticationContextProvider>
    </SettingsContextProvider>
  );
};

export default Root;
