import { ReactNode } from "react";
import { useSafeUserContext } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

type ProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRoute) => {
  const { user, loading } = useSafeUserContext();

  if (loading) return <Loading />;

  if (user) return children;

  return <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
