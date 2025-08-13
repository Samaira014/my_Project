import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import Layout from "../components/Layout";
import CategoryNav from "../components/CategoryNav";
import MyProfile from "../pages/MyProfile";
import Home from "../components/Home";
import Seller from "../pages/Seller";

export const myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // ✅ Default route
        element: (
          <>
            <CategoryNav />
            <Home />
          </>
        ),
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "seller",
        element: <Seller />
      },
    ],
  },
]);
