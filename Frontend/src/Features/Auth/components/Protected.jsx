import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const Protected = ({ children, role = "buyer" }) => {
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (user.role == "buyer") {
    return <Navigate to="/" />;
  }
  return children;
};
