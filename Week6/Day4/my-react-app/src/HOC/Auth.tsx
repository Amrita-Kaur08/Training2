import React from "react";

// HOC to wrap protected components
const WithAuth = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = true; // Mock authentication logic (replace with real auth logic)

  if (!isAuthenticated) {
    return <h2>Unauthorized! Please log in.</h2>;
  }

  return <>{children}</>;
};

export default WithAuth;
