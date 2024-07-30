import { ReactNode } from "react";
import { useSafeUserContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";

type ProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const { user, loading } = useSafeUserContext();

  if (user) return children;

  if (!user && !loading) return <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
