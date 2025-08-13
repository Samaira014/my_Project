import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.fullName && formData.email && formData.password) {
      toast.success("🎉 Registered successfully!");
      navigate("/login");
    } else {
      toast.error("⚠ Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-yellow-50 to-yellow-100 px-4 sm:px-6 lg:px-8">
      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl border border-yellow-300 p-6 sm:p-8"
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center text-3xl sm:text-4xl font-bold text-yellow-900 mb-8 tracking-wide"
        >
          Register
        </motion.h3>

        {/* Full Name */}
        <div className="mb-5">
          <label htmlFor="fullName" className="block mb-1 text-yellow-900 font-medium">
            Full Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#facc15", boxShadow: "0px 0px 8px #facc15" }}
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-yellow-400 px-4 py-2 rounded-md focus:outline-none transition-all"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-yellow-900 font-medium">
            Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#facc15", boxShadow: "0px 0px 8px #facc15" }}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-yellow-400 px-4 py-2 rounded-md focus:outline-none transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-yellow-900 font-medium">
            Password
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#facc15", boxShadow: "0px 0px 8px #facc15" }}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-yellow-400 px-4 py-2 rounded-md focus:outline-none transition-all"
          />
        </div>

        {/* Already have an account */}
        <div className="mb-4">
          <p className="text-center text-sm text-yellow-900">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-yellow-900 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Register Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-lg transition-transform duration-200 text-lg"
        >
          Register
        </motion.button>
      </motion.form>
    </div>
  );
};

export default RegisterPage;
