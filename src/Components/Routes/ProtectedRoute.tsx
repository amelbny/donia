import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthProvider";
import { toast } from "react-toastify";


interface ProtectedRouteProps {
  requiredRoles: string[];
}

const ProtectedRoute: React.FC<React.PropsWithChildren<ProtectedRouteProps>> = ({ children, requiredRoles }) => {
  const { isAuthenticated, userRole, showLoginModal } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      showLoginModal();
    }
  }, [isAuthenticated, showLoginModal]);


  if (!requiredRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;