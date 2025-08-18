import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, placeOrder } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = placeOrder({
      ...formData,
      items: cart,
      total: cart.reduce(
        (sum, item) =>
          sum + (item.discountPrice || item.price) * (item.quantity || item.qty),
        0
      ),
    });

    if (newOrder) {
      navigate(`/order/${newOrder.id}`);
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.discountPrice || item.price) * (item.quantity || item.qty),
    0
  );

  return (
    <div className="px-4 py-8 md:px-10 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
      >
        Secure Checkout 🛒
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Billing Form */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Billing Details
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />

            <h3 className="text-xl font-semibold mt-6 text-gray-700">
              Payment Details
            </h3>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
            >
              Place Order 🚀
            </motion.button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h3>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">🛒 Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-gray-700">
                    {item.name} x {item.quantity || item.qty}
                  </span>
                  <span className="font-medium text-gray-900">
                    ₹
                    {(item.discountPrice || item.price) *
                      (item.quantity || item.qty)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span className="text-blue-600">₹{total}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
