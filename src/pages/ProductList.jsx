import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { allProducts } from "../data/menProducts";
import { useWishlist } from "../context/WishlistContext";

const ProductList = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // ✅ Use global wishlist context
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [filters, setFilters] = useState({
    brands: [],
    sizes: [],
    colors: [],
    sort: "",
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [mainMediaIndex, setMainMediaIndex] = useState({});
  const [toastMsg, setToastMsg] = useState(null);

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((v) => v !== value) };
        } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({ brands: [], sizes: [], colors: [], sort: "" });
  };

  let filteredProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  if (filters.brands.length)
    filteredProducts = filteredProducts.filter((p) =>
      filters.brands.includes(p.brand)
    );
  if (filters.sizes.length)
    filteredProducts = filteredProducts.filter((p) =>
      p.sizes.some((s) => filters.sizes.includes(s))
    );
  if (filters.colors.length)
    filteredProducts = filteredProducts.filter((p) =>
      p.colors.some((c) => filters.colors.includes(c))
    );
  if (filters.sort === "low")
    filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
  if (filters.sort === "high")
    filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);

  // ✅ Wrap toggle with toast (compute BEFORE toggling)
  const handleWishlist = (product) => {
    const willRemove = isWishlisted(product.id);
    toggleWishlist(product);
    setToastMsg(
      willRemove
        ? `❌ Removed "${product.name}" from Wishlist`
        : `❤️ "${product.name}" added to Wishlist`
    );
    setTimeout(() => setToastMsg(null), 2500);
  };

  const brands = [...new Set(allProducts.map((p) => p.brand))];
  const sizes = [...new Set(allProducts.flatMap((p) => p.sizes))];
  const colors = [...new Set(allProducts.flatMap((p) => p.colors))];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
      {/* ✅ Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-sm sm:text-base"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileFilterOpen || window.innerWidth >= 1024) && (
          <motion.div
            className="lg:w-1/5 bg-white p-4 rounded-xl shadow-md space-y-4 sticky top-4 h-max z-50"
            initial={{ x: window.innerWidth < 1024 ? "-100%" : 0 }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth < 1024 ? "-100%" : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {window.innerWidth < 1024 && (
              <button
                className="mb-2 text-gray-600 text-xl"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <AiOutlineClose />
              </button>
            )}

            <h3 className="font-semibold text-lg flex justify-between items-center">
              Filters
              <button className="text-sm text-red-500" onClick={clearFilters}>
                Clear All
              </button>
            </h3>

            <div>
              <label className="font-medium">Brand:</label>
              <div className="flex flex-col mt-1 space-y-1">
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(b)}
                      onChange={() => toggleFilter("brands", b)}
                    />
                    {b}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium">Size:</label>
              <div className="flex flex-col mt-1 space-y-1">
                {sizes.map((s) => (
                  <label key={s} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.sizes.includes(s)}
                      onChange={() => toggleFilter("sizes", s)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium">Color:</label>
              <div className="flex flex-wrap mt-1 gap-2">
                {colors.map((c) => (
                  <span
                    key={c}
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer ${
                      filters.colors.includes(c) ? "border-yellow-500" : ""
                    }`}
                    style={{ backgroundColor: c }}
                    onClick={() => toggleFilter("colors", c)}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium">Sort by Price:</label>
              <select
                className="border p-2 w-full rounded mt-1"
                value={filters.sort}
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
              >
                <option value="">Default</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <motion.div
        className="lg:w-4/5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300"
            >
              {/* Wishlist Heart (uses Context) */}
              <button
                onClick={() => handleWishlist(product)}
                className="absolute top-2 right-2 text-red-500 text-2xl z-10"
              >
                {isWishlisted(product.id) ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>

              {/* Out of Stock Overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                  <span className="text-white text-lg font-bold">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Main Image / Video + Thumbnails */}
              <div className="p-2 sm:p-3">
                <div className="relative">
                  {product.images[mainMediaIndex[product.id] || 0].type ===
                  "video" ? (
                    <video
                      src={product.images[mainMediaIndex[product.id] || 0].url}
                      controls
                      className="w-full h-48 object-contain mx-auto rounded-lg cursor-pointer"
                      onClick={() =>
                        navigate(`/men/${category}/product/${product.id}`)
                      }
                    />
                  ) : (
                    <img
                      src={product.images[mainMediaIndex[product.id] || 0].url}
                      alt={product.name}
                      className="w-full h-48 object-contain mx-auto cursor-pointer rounded-lg"
                      onClick={() =>
                        navigate(`/men/${category}/product/${product.id}`)
                      }
                    />
                  )}

                  {/* Thumbnails */}
                  <div className="flex justify-center mt-2 gap-2 overflow-x-auto">
                    {product.images.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative w-14 h-14 rounded-md border border-gray-300 cursor-pointer hover:border-yellow-500"
                        onClick={() =>
                          setMainMediaIndex({
                            ...mainMediaIndex,
                            [product.id]: idx,
                          })
                        }
                      >
                        {item.type === "video" ? (
                          <video
                            src={item.url}
                            className="w-full h-full object-cover rounded-md"
                            muted
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt={`thumb-${idx}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                        {item.type === "video" && (
                          <span className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 px-1 text-xs rounded">
                            ▶
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <h2 className="text-sm sm:text-base font-semibold mt-2">
                  {product.name}
                </h2>
                <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                <p className="text-gray-500 text-xs sm:text-sm mb-1">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                  <span className="text-sm sm:text-lg font-bold text-yellow-600">
                    ₹{product.discountPrice || product.price}
                  </span>
                  {product.discountPrice &&
                    product.discountPrice !== product.price && (
                      <span className="line-through text-gray-400 text-xs sm:text-sm">
                        ₹{product.price}
                      </span>
                    )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No products found for "{category}"</p>
        )}
      </motion.div>
    </div>
  );
};

export default ProductList;
