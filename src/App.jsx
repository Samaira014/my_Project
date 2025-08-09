import { RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
 import { myRoutes } from "./routes/Router";
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // required CSS



const App = () => {
  return (
    <div>
      <ToastContainer position="bottom-left" />
      <RouterProvider router={myRoutes} />;
    </div>
  );
};

export default App;
