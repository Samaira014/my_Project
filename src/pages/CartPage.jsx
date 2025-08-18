import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return <h2 className="text-center mt-10">Your cart is empty 🛒</h2>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-3"
        >
          {/* ✅ Product Image */}
          <div className="flex items-center gap-4">
              <img
                src={item.cartImage || item.images?.[0]?.url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
                onClick={() => navigate(`/men/${item.category}/${item.id}`)} // ✅ go to ProductDetails
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
          </div>


          {/* ✅ Quantity controls + remove */}
          <div className="flex items-center gap-3">
            <button
              className="px-2 py-1 bg-gray-300 rounded"
              onClick={() =>
                updateQuantity(item.id, Math.max(1, item.qty - 1))
              }
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              className="px-2 py-1 bg-gray-300 rounded"
              onClick={() => updateQuantity(item.id, item.qty + 1)}
            >
              +
            </button>
            <button
              className="ml-4 text-red-500"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Cart total + buttons */}
      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>

        <div className="flex gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
