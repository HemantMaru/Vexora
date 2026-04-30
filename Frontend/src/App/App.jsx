import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app.routes";
import { useAuth } from "../Features/Auth/Hook/useAuth";
import { useSelector } from "react-redux";
import { useCart } from "../Features/cart/Hook/useCart";

const App = () => {
  const { handleGetMe } = useAuth();
  const { fetchCart } = useCart();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      fetchCart(); // 👈 yaha call karo
    }
  }, [user]);
  useEffect(() => {
    handleGetMe();
  }, []);

  return <RouterProvider router={routes} />;
};

export default App;
