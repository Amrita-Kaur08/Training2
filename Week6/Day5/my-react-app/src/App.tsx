import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AboutUs from "./components/AboutUs";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <PublicRoute>
              <AboutUs />
            </PublicRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
