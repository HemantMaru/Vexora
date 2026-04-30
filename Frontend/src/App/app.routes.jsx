import { createBrowserRouter } from "react-router-dom";
import Home from "../Features/Dashboard/Pages/Home";
import MainLayout from "../Features/layout/mainLayout";
import Shop from "../Features/Dashboard/Pages/Shop";
import ProductDetails from "../Features/Dashboard/Pages/ProductDetails";
import CartPage from "../Features/Dashboard/Pages/CartPage";
import Contact from "../Features/Dashboard/Pages/Contact";
import Wishlist from "../Features/Dashboard/Pages/Wishlist";
import Authlayout from "../Features/layout/Authlayout";
import Login from "../Features/Auth/Pages/Login";
import Register from "../Features/Auth/Pages/Register.jsx";
import AddProduct from "../Features/Seller/Pages/AddProduct";
import SellerProducts from "../Features/Seller/Pages/SellerProducts.jsx";
import SellerLayout from "../Features/layout/SellerLayout.jsx";
import { Protected } from "../Features/Auth/components/Protected.jsx";
import SellerDashboard from "../Features/Seller/Pages/SellerDashboard.jsx";
export const routes = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    element: <Authlayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  {
    element: <SellerLayout />,
    children: [
      {
        path: "/addProduct",
        element: (
          <Protected role="seller">
            <AddProduct />
          </Protected>
        ),
      },
      {
        path: "/addProduct/:id",
        element: (
          <Protected role="seller">
            <AddProduct />
          </Protected>
        ),
      },
      {
        path: "/sellerProduct",
        element: (
          <Protected role="seller">
            <SellerProducts />
          </Protected>
        ),
      },
      {
        path: "/seller/Dashboard",
        element: (
          <Protected role="seller">
            <SellerDashboard />
          </Protected>
        ),
      },
    ],
  },
]);
