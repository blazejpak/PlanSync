import { Outlet } from "react-router-dom";
import { AuthenticationContextProvider } from "../context/AuthenticationContext";

const Root = () => {
  return (
    <AuthenticationContextProvider>
      <Outlet />
    </AuthenticationContextProvider>
  );
};

export default Root;
