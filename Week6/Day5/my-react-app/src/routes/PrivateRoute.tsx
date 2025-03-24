import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const user = { id: 123, name: "xyz", email: "xyz@gmail.com", role: "admin" };

  return user.id && allowedRoles.includes(user.role) ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
