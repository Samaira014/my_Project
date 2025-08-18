import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-[70vh] text-gray-600"
      >
        <img
          src="/images/wishlist.jpeg"
          alt="Empty Wishlist"
          className="w-52 mb-6"
        />
        <h2 className="text-2xl font-semibold">Your wishlist is empty ❤️</h2>
        <p className="text-gray-400 mt-2">Start adding your favorite products!</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md"
        >
          Shop Now
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Wishlist ❤️</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {wishlist.map((item) => {
            const cover =
              item.wishlistImage ||
              item.images?.[0]?.url ||
              item.images?.[0] ||
              "";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="relative border rounded-2xl shadow-md hover:shadow-xl bg-white overflow-hidden group"
              >
                {/* Wishlist toggle button (always above image) */}
                <button
                  className="absolute top-3 right-3 bg-white z-20 p-2 rounded-full shadow hover:scale-110 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ stop triggering parent/image click
                    removeFromWishlist(item.id);
                  }}
                >
                  <AiFillHeart className="text-red-500 text-xl" />
                </button>

                {/* Image (only navigates, doesn’t affect wishlist) */}
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/men/${item.category}/product/${item.id}`)
                  }
                >
                  <img
                    src={cover}
                    alt={item.name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.description?.slice(0, 50)}...
                  </p>
                  <div className="flex gap-2 items-center mt-3">
                    <span className="text-lg font-bold text-red-500">
                      ₹{item.discountPrice || item.price}
                    </span>
                    {item.discountPrice && (
                      <span className="line-through text-gray-400 text-sm">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;
