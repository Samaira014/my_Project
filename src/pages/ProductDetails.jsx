import React, { useState } from "react";
import { useParams } from "react-router-dom";

const shirtsData = {
  1: {
    name: "Classic Cotton Shirt",
    colors: [
      { name: "Green", image: "/images/shirt-green.jpg" },
      { name: "Pink", image: "/images/shirt-pink.jpg" },
      { name: "Blue", image: "/images/shirt-blue.jpg" }
    ],
    price: 1500,
    discountPrice: 999,
    sizes: ["S", "M", "L", "XL"]
  },
  2: {
    name: "Slim Fit Formal Shirt",
    colors: [{ name: "White", image: "/images/shirt-formal.jpg" }],
    price: 1800,
    discountPrice: 1199,
    sizes: ["M", "L", "XL"]
  }
};

export default function ProductDetails() {
  const { shirtId } = useParams();
  const product = shirtsData[shirtId];
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="p-6 md:flex gap-10">
      {/* Image */}
      <div className="md:w-1/2">
        <img src={selectedColor.image} alt={product.name} className="w-full rounded-lg" />
      </div>

      {/* Details */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-500 line-through">₹{product.price}</p>
        <p className="text-xl font-semibold text-green-600">₹{product.discountPrice}</p>

        {/* Colors */}
        <div>
          <h4 className="font-medium">Colors:</h4>
          <div className="flex gap-2">
            {product.colors.map(color => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`border-2 p-1 rounded-lg ${selectedColor.name === color.name ? "border-black" : "border-gray-300"}`}
              >
                <img src={color.image} alt={color.name} className="w-12 h-12 object-cover rounded" />
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h4 className="font-medium">Size:</h4>
          <select value={size} onChange={(e) => setSize(e.target.value)} className="border p-2 rounded">
            {product.sizes.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <h4 className="font-medium">Quantity:</h4>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="border p-2 w-20 rounded"
          />
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => alert(`Added ${quantity} x ${product.name} (${selectedColor.name}, ${size}) to cart`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
