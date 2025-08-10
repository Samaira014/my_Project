import { RouterProvider } from "react-router-dom";
 import { myRoutes } from "./routes/Router";
 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // required CSS
import Home from "./components/Home";



const App = () => {
  return (
    <div>
     
      <ToastContainer position="bottom-left" />
      <RouterProvider router={myRoutes} />
       <Home />
    </div>
  );
};

export default App;
