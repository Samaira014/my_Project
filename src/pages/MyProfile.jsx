import React, { useState } from "react";

const ProfilePage = ({ userData }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    gender: userData?.gender || "",
    address: userData?.address || "",
    addressType: userData?.addressType || "Home",
  });

  const [dropdown, setDropdown] = useState({
    orders: false,
    account: false,
    payment: false,
  });

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

  const handleSave = () => {
    console.log("Updated Data:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row p-4 gap-[40px]">
      {/* Left Sidebar */}
      <div
        className="w-full md:w-1/3 bg-white rounded-lg shadow p-4 mb-4 md:mb-0 md:ml-[50px]
        relative border-2 border-transparent animate-border"
      >
        <style>{`
          @keyframes borderMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .animate-border {
            border-image: linear-gradient(270deg, #facc15, #fbbf24, #facc15);
            border-image-slice: 1;
            animation: borderMove 3s linear infinite;
            background-size: 200% auto;
          }
        `}</style>

        <div className="flex flex-col items-center">
          <img
            src="/images/radhe.jpg"
            alt="Profile"
            className="rounded-full w-24 h-24 mb-3 transition-transform duration-300 hover:scale-110"
          />
          <h2 className="text-lg font-semibold">{formData.name || "Your Name"}</h2>
        </div>

        <nav className="mt-6 space-y-3">
          {/* My Orders */}
          <div>
            <button
              onClick={() => toggleDropdown("orders")}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded transition-transform duration-200 hover:scale-105"
            >
              My Orders
            </button>
            {dropdown.orders && (
              <div className="ml-4 mt-1 text-sm text-gray-600 space-y-1">
                <p>Order #1234 - Delivered</p>
                <p>Order #1235 - In Transit</p>
              </div>
            )}
          </div>

          {/* Account Settings */}
          <div>
            <button
              onClick={() => toggleDropdown("account")}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded transition-transform duration-200 hover:scale-105"
            >
              Account Settings
            </button>
            {dropdown.account && (
              <div className="ml-4 mt-1 text-sm text-gray-600 space-y-1">
                <p>Change Password</p>
                <p>Privacy Settings</p>
              </div>
            )}
          </div>

          {/* Payment Gateway */}
          <div>
            <button
              onClick={() => toggleDropdown("payment")}
              className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded transition-transform duration-200 hover:scale-105"
            >
              Payment Gateway
            </button>
            {dropdown.payment && (
              <div className="ml-4 mt-1 text-sm text-gray-600 space-y-1">
                <p>Credit/Debit Card</p>
                <p>UPI</p>
                <p>Net Banking</p>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Right Content */}
      <div
        className="w-full md:w-2/3 bg-white rounded-lg shadow p-6 md:mr-[50px]
        relative border-2 border-transparent animate-border"
      >
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone No</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
              rows={3}
            ></textarea>
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Address Type</label>
            <select
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 
          transition-transform duration-200 hover:scale-105"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
