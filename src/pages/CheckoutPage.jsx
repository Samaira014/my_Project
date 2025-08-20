import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CheckoutPage = () => {
  const { cart, placeOrder, updateQuantity } = useCart();
  const navigate = useNavigate();
  

  // Saved addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      address: "123 Park Street",
      city: "Patna",
      postalCode: "800001",
      country: "India",
    },
    {
      id: 2,
      name: "Samaira Singh",
      email: "samaira@example.com",
      address: "45 Residency Road",
      city: "Bangalore",
      postalCode: "560001",
      country: "India",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [saveNewAddress, setSaveNewAddress] = useState(false);

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
    upiId: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address.id);
    setFormData({ ...formData, ...address });
  };

  const handleNewAddress = () => {
    setSelectedAddress(null);
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save new address if user selected new one
    if (saveNewAddress && !selectedAddress) {
      const newAddress = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      };
      setSavedAddresses([...savedAddresses, newAddress]);
      setSaveNewAddress(false);
    }

    const newOrder = placeOrder({
      ...formData,
      paymentMethod,
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
    <div className="px-4 py-6 sm:px-6 md:px-10 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800"
      >
        Secure Checkout 🛒
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Address & Payment */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Current Address
          </h3>

          {/* Saved Addresses */}
          {savedAddresses.length > 0 && (
            <div className="space-y-3 mb-6">
              <p className="text-gray-600">Choose from saved addresses:</p>
              {savedAddresses.map((addr) => (
                <label
                  key={addr.id}
                  className={`block p-3 border rounded-lg cursor-pointer text-sm sm:text-base ${
                    selectedAddress === addr.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="savedAddress"
                    value={addr.id}
                    checked={selectedAddress === addr.id}
                    onChange={() => handleAddressSelect(addr)}
                    className="mr-2"
                  />
                  <span className="font-medium">{addr.name}</span>, {addr.address},{" "}
                  {addr.city}, {addr.country} - {addr.postalCode}
                </label>
              ))}
              <button
                type="button"
                onClick={handleNewAddress}
                className="text-blue-600 text-sm underline"
              >
                + Use New Address
              </button>
            </div>
          )}

          {/* Address Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Inputs */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              disabled={!!selectedAddress}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={!!selectedAddress}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              disabled={!!selectedAddress}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                disabled={!!selectedAddress}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                required
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                disabled={!!selectedAddress}
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
              disabled={!!selectedAddress}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />

            {/* Save New Address Option */}
            {!selectedAddress && (
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={saveNewAddress}
                  onChange={(e) => setSaveNewAddress(e.target.checked)}
                />
                Save this address for future checkouts
              </label>
            )}

            {/* Payment Method */}
            <h3 className="text-lg sm:text-xl font-semibold mt-6 text-gray-700">
              Payment Method
            </h3>
            <div className="space-y-3 text-sm sm:text-base">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit / Debit Card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>UPI</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Conditional Payment Inputs */}
            {paymentMethod === "card" && (
              <div className="space-y-4 mt-4">
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
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  name="upiId"
                  placeholder="Enter your UPI ID (e.g. username@upi)"
                  value={formData.upiId}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
                  required
                />
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition mt-6"
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
          className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h3>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">🛒 Your cart is empty.</p>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                },
              }}
              className="space-y-4"
            >
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                  }}
                  className="flex items-center justify-between gap-4 border-b pb-3 rounded-lg p-2 transition"
                >
                  {/* Image */}
                  <img
                    src={
                      item.images?.find((img) => img.type === "image")?.url ||
                      "/placeholder.jpg"
                    }
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border"
                  />

                  {/* Product Info */}
                  <div className="flex-1 text-sm sm:text-base">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Brand: {item.brand} | {item.category}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="p-1 border rounded-md"
                      >
                        <AiOutlineMinus size={14} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 border rounded-md"
                      >
                        <AiOutlinePlus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    ₹{(item.discountPrice || item.price) * item.quantity}
                  </span>
                </motion.div>
              ))}

              {/* Total */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="flex justify-between font-bold text-lg pt-3 border-t"
              >
                <span>Total</span>
                <span className="text-blue-600">₹{total}</span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
