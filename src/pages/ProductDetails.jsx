// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "../data/menProducts";
import { useCart } from "../context/CartContext";


const ProductDetails = () => {
  const { category, shirtId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.id === Number(shirtId));
  const [mainMediaIndex, setMainMediaIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  if (!product) return <p className="p-4">Product not found</p>;

  // ✅ Toggle wishlist with proper details
  const toggleWishlist = () => {
    const exists = wishlist.find((p) => p.id === product.id);
    if (exists) {
      // Remove from wishlist
      setWishlist(wishlist.filter((p) => p.id !== product.id));
    } else {
      // Add to wishlist
      const wishlistItem = {
        ...product,
        category,
        wishlistImage: product.images[0]?.url, // ✅ thumbnail
      };
      setWishlist([...wishlist, wishlistItem]);
    }
  };

  const handleBuyNow = () => setIsBuyNowModalOpen(true);

  const proceedToCheckout = () => {
    const cartItem = { ...product, selectedSize, selectedColor, quantity };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    setIsBuyNowModalOpen(false);
    navigate("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
      {/* Back Button */}
      <button
        className="mb-4 text-gray-600 hover:text-gray-800"
        onClick={() => navigate(`/men/${category}`)}
      >
        &larr; Back to {category}
      </button>

      {/* Left: Product Images */}
      <div className="lg:w-1/2 relative">
        <AnimatePresence>
          <motion.div
            key={mainMediaIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {product.images[mainMediaIndex].type === "video" ? (
              <video
                src={product.images[mainMediaIndex].url}
                controls
                className="w-full h-[400px] lg:h-[500px] object-contain border rounded-lg"
              />
            ) : (
              <img
                src={product.images[mainMediaIndex].url}
                alt={product.name}
                className="w-full h-[400px] lg:h-[500px] object-contain border rounded-lg"
              />
            )}
            {/* Wishlist Heart */}
            <button
              className="absolute top-2 right-2 text-3xl z-10"
              onClick={toggleWishlist}
            >
              {wishlist.find((p) => p.id === product.id) ? (
                <AiFillHeart className="text-red-500" />
              ) : (
                <AiOutlineHeart className="text-gray-200 hover:text-red-500" />
              )}
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {product.images.map((item, idx) => (
            <motion.div
              key={idx}
              className={`w-16 h-16 rounded cursor-pointer border overflow-hidden ${
                mainMediaIndex === idx ? "border-yellow-500" : "border-gray-300"
              }`}
              onClick={() => setMainMediaIndex(idx)}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.type === "video" ? (
                <video src={item.url} className="w-full h-full object-cover" muted />
              ) : (
                <img src={item.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-gray-700">{product.description}</p>

        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-yellow-600">
            ₹{product.discountPrice || product.price}
          </span>
          {product.discountPrice && product.discountPrice !== product.price && (
            <span className="line-through text-gray-400">{product.price}</span>
          )}
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-medium mb-1">Size:</h3>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border rounded ${
                  selectedSize === size
                    ? "border-yellow-500 bg-yellow-100"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="font-medium mb-1">Color:</h3>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? "border-yellow-500" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <h3 className="font-medium">Quantity:</h3>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 border rounded"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={!product.inStock}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-2 py-1 border rounded"
              onClick={() => setQuantity((q) => q + 1)}
              disabled={!product.inStock}
            >
              +
            </button>
          </div>
        </div>

        {/* Buy Now & Add to Cart Buttons */}
        <motion.button
          className={`mt-4 px-6 py-2 rounded shadow w-full ${
            product.inStock
              ? "bg-yellow-500 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!product.inStock}
          onClick={() => setIsBuyNowModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy Now
        </motion.button>

        <motion.button
            className={`mt-2 px-6 py-2 rounded shadow w-full ${
              product.inStock
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!product.inStock}
            onClick={() => {
              if (!selectedSize || !selectedColor) {
                alert("Please select size and color before adding to cart.");
                return;
              }

              const cartItem = {
                  ...product,
                  selectedSize,
                  selectedColor,
                  qty: quantity,
                  cartImage: product.images[0]?.url, // ✅ thumbnail image
                  category, // ✅ so we know which category page to link back
                };

              addToCart(cartItem); // ✅ use CartContext function
              navigate("/cart");   // ✅ redirect to CartPage
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
        </motion.button>



        {!product.inStock && (
          <p className="text-red-500 font-semibold mt-2">Out of Stock</p>
        )}
      </div>

      {/* Buy Now Modal */}
      <AnimatePresence>
        {isBuyNowModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-700 text-2xl"
                onClick={() => setIsBuyNowModalOpen(false)}
              >
                <AiOutlineClose />
              </button>
              <h2 className="text-xl font-bold mb-4">Confirm Purchase</h2>
              <p>
                <strong>Product:</strong> {product.name}
              </p>
              <p>
                <strong>Size:</strong> {selectedSize || "Not selected"}
              </p>
              <p>
                <strong>Color:</strong>{" "}
                <span
                  className="inline-block w-4 h-4 rounded-full border"
                  style={{ backgroundColor: selectedColor }}
                />
              </p>
              <p>
                <strong>Quantity:</strong> {quantity}
              </p>
              <p className="mt-2 font-bold text-yellow-600">
                Total: ₹{(product.discountPrice || product.price) * quantity}
              </p>
              <motion.button
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded w-full hover:bg-yellow-600"
                onClick={proceedToCheckout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
