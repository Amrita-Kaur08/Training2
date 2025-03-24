import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = { id: 123, name: "xyz", email: "xyz@gmail.com", role: "admin" };

  return user.id ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoute;
