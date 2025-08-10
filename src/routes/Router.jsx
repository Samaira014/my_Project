import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../components/RegisterPage";
import LoginPage from "../components/LoginPage";
import Layout from "../components/Layout";
import CategoryNav from "../components/CategoryNav";

export const myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // ✅ This is the default route
        element: <CategoryNav />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);


// import { createBrowserRouter } from "react-router-dom";
// import RegisterPage from "../components/RegisterPage";
// import LoginPage from "../components/LoginPage";
// import Layout from "../components/Layout";
// //import { Children } from "react";

// export let myRoutes = createBrowserRouter([
//     {
//         path: "/",
//         element: <Layout />,
//         Children: [
//             {
//                 path: "/",
//                 element: <RegisterPage />,
//             },
//             {
//                 path: "/",
//                 element: <LoginPage />,
//             }
//         ]
//     }
// ])
