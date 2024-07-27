import { ReactNode } from "react";
import { useSafeUserContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";

type ProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const { user } = useSafeUserContext();
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default ProtectedRoute;
