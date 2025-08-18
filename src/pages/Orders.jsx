// src/pages/Orders.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Orders = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">No Orders Found</h2>
        <Link to="/" className="text-blue-600 underline">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/order/${order.id}`}
            className="block border rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <span className="font-semibold">Order #{order.id}</span>
              <span className="text-gray-600">{order.date}</span>
            </div>
            <p className="text-gray-700 mt-2">
              {order.items.length} items • Total: ₹{order.total}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
