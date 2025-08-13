import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { FaCamera } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MyProfile = ({ userData }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    gender: userData?.gender || "",
    address: userData?.address || "",
    addressType: userData?.addressType || "Home",
    profileImage: "/images/radhe.jpg", // default image
  });

  const [dropdown, setDropdown] = useState({
    orders: false,
    account: false,
    payment: false,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleDropdown = (key) => {
    setDropdown((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  };

  const handleSave = () => {
    console.log("Updated Data:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      

      <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-8 px-4 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <motion.aside
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="w-full md:w-1/3 bg-white rounded-2xl shadow-lg p-6 border border-yellow-200"
        >
          <div className="flex flex-col items-center relative">
            {/* Profile Image with Edit Icon */}
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={formData.profileImage}
                alt="Profile"
                className="rounded-full w-28 h-28 shadow-md object-cover"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 bg-yellow-500 p-2 rounded-full shadow-md hover:bg-yellow-600 transition"
              >
                <FaCamera className="text-white text-sm" />
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              id="profileImage"
              type="file"
              accept="image/*"
              capture="user" // 'user' for front camera, 'environment' for back camera
              className="hidden"
              onChange={handleImageChange}
            />

            <h2 className="text-lg font-bold mt-3 text-gray-800">
              {formData.name || "Your Name"}
            </h2>
          </div>

          {/* Navigation */}
          <nav className="mt-8 space-y-3">
            {[
              { key: "orders", label: "My Orders", icon: ShoppingBagIcon },
              { key: "account", label: "Account Settings", icon: Cog6ToothIcon },
              { key: "payment", label: "Payment Gateway", icon: CreditCardIcon },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <button
                  onClick={() => toggleDropdown(key)}
                  className="w-full flex items-center gap-3 px-4 py-2 hover:bg-yellow-100 rounded-lg transition"
                >
                  <Icon className="h-5 w-5 text-yellow-600" />
                  <span className="flex-1 text-left">{label}</span>
                </button>

                <AnimatePresence>
                  {dropdown[key] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-10 mt-1 text-sm text-gray-600 space-y-1 overflow-hidden"
                    >
                      {key === "orders" && (
                        <>
                          <p>Order #1234 - Delivered</p>
                          <p>Order #1235 - In Transit</p>
                        </>
                      )}
                      {key === "account" && (
                        <>
                          <p>Change Password</p>
                          <p>Privacy Settings</p>
                        </>
                      )}
                      {key === "payment" && (
                        <>
                          <p>Credit/Debit Card</p>
                          <p>UPI</p>
                          <p>Net Banking</p>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </motion.aside>

        {/* Right Content */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="w-full md:w-2/3 bg-white rounded-2xl shadow-lg p-6 border border-yellow-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone No", name: "phone", type: "tel" },
            ].map(({ label, name, type }) => (
              <motion.div key={name} whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </motion.div>
            ))}

            {/* Gender */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>

            {/* Address */}
            <motion.div whileHover={{ scale: 1.02 }} className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows={3}
              ></textarea>
            </motion.div>

            {/* Address Type */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-sm font-medium mb-1">
                Address Type
              </label>
              <select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                className="w-full border border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSave}
            className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default MyProfile;
