import React from "react";
import { IoShirtOutline } from "react-icons/io5";
import { PiPantsLight } from "react-icons/pi";
import { CgBoy } from "react-icons/cg";
import { FiWatch } from "react-icons/fi";
import { GiRunningShoe } from "react-icons/gi";
import Carousel from "./Carousel";
import { SiPuma, SiAdidas, SiNike, SiHandm, SiZara, SiReebok } from "react-icons/si";

const Home = () => {
 

  const categories = [
  { icon: <img src="/images/men.png" alt="Men" className="w-20 h-20" />, title: "Men" },
  { icon: <img src="/images/women.png" alt="Women" className="w-20 h-20" />, title: "Women" },
  { icon: <img src="/images/girl.png" alt="Kids" className="w-20 h-20" />, title: "Kids" },
  { icon: <img src="/images/accessories.png" alt="Accessories" className="w-20 h-20" />, title: "Accessories" },
  { icon: <img src="/images/footware.png" alt="Footwear" className="w-20 h-20" />, title: "Footwear" },
  { icon: <img src="/images/laptop3.png" alt="Electronics" className="w-20 h-20" />, title: "Electronics" },
];

   const brandCategories = [
    { icon: <SiPuma size={40} />, title: "Puma" },
    { icon: <SiAdidas size={40} />, title: "Adidas" },
    { icon: <SiNike size={40} />, title: "Nike" },
    { icon: <SiHandm size={40} />, title: "H&M" },
    { icon: <SiZara size={40} />, title: "Zara" },
    { icon: <SiReebok size={40} />, title: "Reebok" },
  ];

  return (
    <div className="w-full">
      {/* Carousel Section */}
      <section className="mb-10">
        <Carousel />
      </section>

      {/* Shop by Category */}
      <section className="px-6 md:px-12 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {cat.icon}
              <p className="text-center text-sm font-medium mt-3">{cat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Brand */}
      <section className=" md:px-12 mt-[-35px] bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Brand</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brandCategories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {cat.icon}
              <p className="text-center text-sm font-medium mt-3">{cat.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
