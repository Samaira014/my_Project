import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // ✅ Added for animation

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      /*
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
      return;
      */

      if (
        formData.email.trim().toLowerCase() === "test@example.com" &&
        formData.password === "123456"
      ) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 px-4 sm:px-6 lg:px-8">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-yellow-300 p-6 sm:p-8"
      >
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl sm:text-4xl font-bold text-yellow-900 mb-8 tracking-wide"
        >
          Login
        </motion.h3>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <label htmlFor="email" className="block mb-1 text-yellow-900 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-yellow-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <label htmlFor="password" className="block mb-1 text-yellow-900 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-yellow-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <p className="text-center text-sm text-yellow-900">
            New here?{" "}
            <Link to="/" className="font-semibold text-yellow-800 hover:underline">
              Register
            </Link>
          </p>
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-transform duration-200 text-lg"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
};

export default LoginPage;
