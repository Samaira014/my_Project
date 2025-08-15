// src/pages/MenItems.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MenItems() {
  const menCategories = [
    { name: "Shirts", path: "shirt", image: "/images/mensShirt.png" },
    { name: "T-shirt", path: "t-shirt", image: "/images/mensTshirt.png" },
    { name: "Blazer", path: "blazer", image: "/images/mensBlazer.jpeg" },
    { name: "Trouser", path: "trouser", image: "/images/mensTrouser.png" },
    { name: "Jeans", path: "jeans", image: "/images/mensjeans.png" },
    { name: "Shoes", path: "shoes", image: "/images/mensShoes.png" },
    { name: "Sunglasses", path: "sunglasses", image: "/images/menSunglass.jpg" },
    { name: "Belt", path: "belt", image: "/images/mensBelt.png" },
    { name: "Watch", path: "watch", image: "/images/mensWatch.png" },
    { name: "Accessories", path: "accessories", image: "/images/menChain.jpeg" },
    { name: "Cufflinks", path: "cufflinks", image: "/images/mensCufflinks.jpeg" },
    { name: "Cap", path: "cap", image: "/images/mensCap.jpg" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {menCategories.map((cat, index) => (
        <motion.div key={index} variants={cardVariants}>
          <Link
            to={`/men/${cat.path}`}
            className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="w-full aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden shadow-md flex items-center justify-center"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="object-contain w-full h-full"
              />
            </motion.div>
            <h2 className="mt-2 font-medium text-gray-800">{cat.name}</h2>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
