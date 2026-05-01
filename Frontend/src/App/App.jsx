import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes } from "./app.routes";
import { useAuth } from "../Features/Auth/Hook/useAuth";
import { useSelector } from "react-redux";
import { useCart } from "../Features/cart/Hook/useCart";
import { useProducts } from "../Features/Dashboard/Hook/useProducts";

const App = () => {
  const { handleGetMe } = useAuth();
  const { handleGetAllProducts } = useProducts();
  const { fetchCart } = useCart();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      fetchCart(); // 👈 yaha call karo
    }
  }, [user]);
  useEffect(() => {
    handleGetMe();
    handleGetAllProducts();
  }, []);

  return <RouterProvider router={routes} />;
};

export default App;
