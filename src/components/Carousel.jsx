import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  "/images/carausel.jpg",
  "/images/laptop1.jpg",
  "/images/science.jpg"
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full bg-gray-100 py-2">
      {/* Carousel Container */}
      <div className="relative overflow-hidden w-full flex justify-center px-3">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-200 z-10"
        >
          <FaArrowLeft size={20} />
        </button>

        {/* Image Card */}
        <div className="w-full h-[40vh] bg-white shadow-lg overflow-hidden">
          <img
            src={slides[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-200 z-10"
        >
          <FaArrowRight size={20} />
        </button>
      </div>

      {/* Bullets */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
