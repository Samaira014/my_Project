import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaShoppingCart, FaTimes, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ useCart instead of CartContext

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { cart, removeFromCart } = useCart(); // ✅ correct usage

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <nav className="bg-[#ffffff] text-blue-950 px-4 sm:px-8 py-2 flex items-center justify-between ">
      {/* Left - Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold tracking-wide mr-4 cursor-pointer">
          MyApp
        </span>
      </div>

      {/* Center - Search Bar (Desktop only) */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex flex-1 max-w-xl mx-4 relative bg-[#f7f7f7] rounded-2xl"
      >
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-950 " />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, brands and more"
          className="w-full pl-10 pr-4 py-2 border-2 border-transparent rounded-2xl
                     focus:bg-white focus:text-black
                     placeholder-blue-950 text-black shadow-sm"
        />
      </form>

      {/* Right - Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {/* Login Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setLoginOpen(true)}
          onMouseLeave={() => setLoginOpen(false)}
        >
          <button className="hover:underline">Login</button>
          <AnimatePresence>
            {isLoginOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 bg-white text-black shadow-lg rounded w-48 z-50"
              >
                <ul>
                  <Link
                    to="/myprofile"
                    className="block hover:bg-gray-100 cursor-pointer p-2 rounded"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/register"
                    className="block hover:bg-gray-100 cursor-pointer p-2 rounded"
                  >
                    Register
                  </Link>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer">Orders</li>
                  <Link
                    to="/wishlist"
                    className="block hover:bg-gray-100 cursor-pointer p-2 rounded"
                  >
                    Wishlist
                  </Link>
                  <li className="p-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart */}
        <button
          className="flex items-center gap-1"
          onClick={() => setCartOpen(true)}
        >
          <FaShoppingCart /> Cart ({cart.length})
        </button>

        {/* Become a Seller */}
        <a href="/seller" className="hover:underline">
          Become a Seller
        </a>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={() => setMobileMenuOpen(true)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* ✅ Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed top-0 right-0 w-80 h-full bg-white text-black shadow-lg z-50 p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Your Cart</span>
              <button onClick={() => setCartOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="flex-1">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-3 flex-1 overflow-y-auto">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} x {item.qty} {/* ✅ use qty from context */}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                {/* ✅ View Cart Button */}
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Cart
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
