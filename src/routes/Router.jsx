// src/routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import CategoryNav from "../components/CategoryNav";
import Home from "../components/Home";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import MyProfile from "../pages/MyProfile";
import Seller from "../pages/Seller";
import MenItems from "../pages/MenItems";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../pages/ProductList";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import WishlistPage from "../pages/WishlistPage";
import OrderDetails from "../pages/OrderDetails";
import Orders from "../pages/Orders";

export const myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <>
            <CategoryNav />
            <Home />
          </>
        ),
      },
      { path: "myprofile", element: <MyProfile /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "seller", element: <Seller /> },

      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      {
        path: "/orders", element: <Orders />, },
      {
        path: "/order/:id", element: <OrderDetails />, },

      // Men category routes
      {
        path: "men",
        children: [
          { index: true, element: <MenItems /> },
          { path: ":category", element: <ProductList /> }, // Product list
          { path: ":category/product/:shirtId", element: <ProductDetails /> }, // Product details
        ],
      },
    ],
  },
]);
