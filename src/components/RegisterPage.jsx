import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    // Dummy validation — replace with your backend logic
    if (formData.fullName && formData.email && formData.password) {
      toast.success("Registered successfully!");
      navigate("/login");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-blue-50 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl border border-blue-200 p-6 sm:p-8"
      >
        <h3 className="text-center text-3xl sm:text-4xl font-bold text-blue-950 mb-8 tracking-wide">
          Register for Green Basket
        </h3>

        <div className="mb-5">
          <label htmlFor="fullName" className="block mb-1 text-blue-950 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border border-blue-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>

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
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-950 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-950 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105 duration-200 text-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
