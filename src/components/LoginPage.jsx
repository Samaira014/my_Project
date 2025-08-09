import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    // If you want API login, uncomment this block:
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

    // Hardcoded login for testing without backend:
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
    <div className="min-h-screen w-full flex justify-center items-center bg-blue-50 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-blue-200 p-6 sm:p-8"
      >
        <h3 className="text-center text-3xl sm:text-4xl font-bold text-blue-950 mb-8 tracking-wide">
          Login to Green Basket
        </h3>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 text-blue-950 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-blue-950 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

        <div className="mb-4">
          <p className="text-center text-sm text-blue-950">
            New here?{" "}
            <Link to="/" className="font-semibold text-blue-800 hover:underline">
              Register
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-950 hover:bg-blue-900 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105 duration-200 text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
