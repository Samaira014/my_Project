// src/pages/OrderDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { orders } = useCart();

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <Link to="/orders" className="text-blue-600 underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Order #{order.id}</h2>
      <p className="text-gray-600 mb-6">Placed on: {order.date}</p>

      <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b pb-2 text-lg"
          >
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>₹{(item.discountPrice || item.price) * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-bold text-xl mt-4">
        <span>Total</span>
        <span>₹{order.total}</span>
      </div>

      <Link
        to="/orders"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetails;
