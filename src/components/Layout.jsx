import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <ToastContainer position="bottom-left" />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout