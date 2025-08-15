// src/pages/ProductList.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";

const allProducts = [
  {
    id: 1,
    category: "shirt",
    name: "Classic Cotton Shirt",
    brand: "H&M",
    images: [
      "/images/shirt1.jpg",
      "/images/shirt-green.jpg",
      "/images/shirt-blue.jpg",
      "/images/shirt-pink.jpg",
      "/images/shirt-yellow.jpg",
      "/images/shirt-grey.jpg",
    ],
    price: 1500,
    discountPrice: 999,
    description: "Soft cotton shirt perfect for casual and formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1e40af", "#f43f5e", "#22c55e"],
    inStock: true,
  },
  {
    id: 2,
    category: "shirt",
    name: "Classic Cotton Shirt",
    brand: "H&M",
    images: [
      "/images/shirt1.jpg",
      "/images/shirt-green.jpg",
      "/images/shirt-blue.jpg",
      "/images/shirt-pink.jpg",
      "/images/shirt-yellow.jpg",
      "/images/shirt-grey.jpg",
    ],
    price: 1500,
    discountPrice: 999,
    description: "Soft cotton shirt perfect for casual and formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1e40af", "#f43f5e", "#22c55e"],
    inStock: true,
  },
  {
    id: 3,
    category: "shirt",
    name: "Classic Cotton Shirt",
    brand: "H&M",
    images: [
      "/images/shirt1.jpg",
      "/images/shirt-green.jpg",
      "/images/shirt-blue.jpg",
      "/images/shirt-pink.jpg",
      "/images/shirt-yellow.jpg",
      "/images/shirt-grey.jpg",
    ],
    price: 1500,
    discountPrice: 999,
    description: "Soft cotton shirt perfect for casual and formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1e40af", "#f43f5e", "#22c55e"],
    inStock: true,
  },
  {
    id: 4,
    category: "shirt",
    name: "Classic Cotton Shirt",
    brand: "H&M",
    images: [
      "/images/shirt1.jpg",
      "/images/shirt-green.jpg",
      "/images/shirt-blue.jpg",
      "/images/shirt-pink.jpg",
      "/images/shirt-yellow.jpg",
      "/images/shirt-grey.jpg",
    ],
    price: 1500,
    discountPrice: 999,
    description: "Soft cotton shirt perfect for casual and formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1e40af", "#f43f5e", "#22c55e"],
    inStock: true,
  },
  {
    id: 5,
    category: "shirt",
    name: "Classic Cotton Shirt",
    brand: "H&M",
    images: [
      "/images/shirt1.jpg",
      "/images/shirt-green.jpg",
      "/images/shirt-blue.jpg",
      "/images/shirt-pink.jpg",
      "/images/shirt-yellow.jpg",
      "/images/shirt-grey.jpg",
    ],
    price: 1500,
    discountPrice: 999,
    description: "Soft cotton shirt perfect for casual and formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#1e40af", "#f43f5e", "#22c55e"],
    inStock: true,
  },
  {
    id: 6,
    category: "shirt",
    name: "Slim Fit Formal Shirt",
    brand: "Zara",
    images: [
      "/images/shirt-formal.jpg",
      "/images/shirt-white2.jpg",
      "/images/shirt-grey.jpg",
      "/images/shirt-black.jpg",
      "/images/shirt-blue2.jpg",
      "/images/shirt-red.jpg",
    ],
    price: 1800,
    discountPrice: 1199,
    description: "Elegant slim fit shirt, perfect for office and parties.",
    sizes: ["M", "L", "XL"],
    colors: ["#ffffff", "#000000"],
    inStock: false,
  },
];

const ProductList = () => {
  const { category } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [hoveredImage, setHoveredImage] = useState({});
  const [showThumbnails, setShowThumbnails] = useState({});
  const [filters, setFilters] = useState({
    brands: [],
    sizes: [],
    colors: [],
    sort: "",
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

  if (filters.brands.length) filteredProducts = filteredProducts.filter(p => filters.brands.includes(p.brand));
  if (filters.sizes.length) filteredProducts = filteredProducts.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
  if (filters.colors.length) filteredProducts = filteredProducts.filter(p => p.colors.some(c => filters.colors.includes(c)));
  if (filters.sort === "low") filteredProducts.sort((a,b) => a.discountPrice - b.discountPrice);
  if (filters.sort === "high") filteredProducts.sort((a,b) => b.discountPrice - a.discountPrice);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) setWishlist(wishlist.filter((i) => i !== id));
    else setWishlist([...wishlist, id]);
  };

  const brands = [...new Set(allProducts.map(p => p.brand))];
  const sizes = [...new Set(allProducts.flatMap(p => p.sizes))];
  const colors = [...new Set(allProducts.flatMap(p => p.colors))];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
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
            className={`lg:w-1/5 bg-white p-4 rounded-xl shadow-md space-y-4 sticky top-4 h-max z-50`}
            initial={{ x: window.innerWidth < 1024 ? "-100%" : 0 }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth < 1024 ? "-100%" : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button for Mobile */}
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
              <button
                className="text-sm text-red-500"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </h3>

            {/* Brand Filter */}
            <div>
              <label className="font-medium">Brand:</label>
              <div className="flex flex-col mt-1 space-y-1">
                {brands.map(b => (
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

            {/* Size Filter */}
            <div>
              <label className="font-medium">Size:</label>
              <div className="flex flex-col mt-1 space-y-1">
                {sizes.map(s => (
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

            {/* Color Filter */}
            <div>
              <label className="font-medium">Color:</label>
              <div className="flex flex-wrap mt-1 gap-2">
                {colors.map(c => (
                  <span
                    key={c}
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer ${filters.colors.includes(c) ? "border-yellow-500" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => toggleFilter("colors", c)}
                  />
                ))}
              </div>
            </div>

            {/* Price Sort */}
            <div>
              <label className="font-medium">Sort by Price:</label>
              <select
                className="border p-2 w-full rounded mt-1"
                value={filters.sort}
                onChange={(e) => setFilters({...filters, sort: e.target.value})}
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
              onMouseEnter={() => setShowThumbnails({ ...showThumbnails, [product.id]: true })}
              onMouseLeave={() => setShowThumbnails({ ...showThumbnails, [product.id]: false })}
            >
              {/* Wishlist Heart */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 text-red-500 text-2xl z-10"
              >
                {wishlist.includes(product.id) ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>

              {/* Out of Stock Overlay */}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                  <span className="text-white text-lg font-bold">Out of Stock</span>
                </div>
              )}

              {/* Main Image */}
              <img
                src={hoveredImage[product.id] || product.images[0]}
                alt={product.name}
                className="w-full h-32 sm:h-40 md:h-48 object-cover"
              />

              {/* Thumbnails */}
              {showThumbnails[product.id] && (
                <div className="absolute bottom-0 left-0 w-full bg-white bg-opacity-90 p-1 flex justify-center gap-1 z-20 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-10 h-10 object-cover rounded-md border border-gray-300 hover:border-yellow-500"
                      onMouseEnter={() =>
                        setHoveredImage({ ...hoveredImage, [product.id]: img })
                      }
                    />
                  ))}
                </div>
              )}

              {/* Product Info */}
              <div className="p-2 sm:p-3">
                <h2 className="text-sm sm:text-base font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-xs sm:text-sm mb-1">{product.description}</p>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-lg font-bold text-yellow-600">
                    ₹{product.discountPrice}
                  </span>
                  <span className="line-through text-gray-400 text-xs sm:text-sm">
                    ₹{product.price}
                  </span>
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
