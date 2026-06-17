import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the home page, but save the current location they were
    // trying to go to.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
