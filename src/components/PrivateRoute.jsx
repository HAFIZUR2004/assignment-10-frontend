import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // যদি user logged-in না থাকে, redirect করবে login page-এ
    return <Navigate to="/login" replace />;
  }

  // যদি logged-in থাকে, children render করবে
  return children;
};

export default PrivateRoute;
