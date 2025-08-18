import { RouterProvider } from "react-router-dom";
import { myRoutes } from "./routes/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext"; // ✅ FIXED IMPORT

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastContainer position="bottom-left" />
        <RouterProvider router={myRoutes} />
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
