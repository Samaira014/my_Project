import React from "react";
import { IoShirtOutline } from "react-icons/io5";
import { PiPantsLight } from "react-icons/pi";
import { CgBoy } from "react-icons/cg";
import { FiWatch } from "react-icons/fi";
import { GiRunningShoe } from "react-icons/gi";
import Carousel from "./Carousel";
import { SiPuma, SiAdidas, SiNike, SiHandm, SiZara, SiReebok } from "react-icons/si";

const Home = () => {
  const brandCategories = [
    { icon: <SiPuma size={40} />, title: "Puma" },
    { icon: <SiAdidas size={40} />, title: "Adidas" },
    { icon: <SiNike size={40} />, title: "Nike" },
    { icon: <SiHandm size={40} />, title: "H&M" },
    { icon: <SiZara size={40} />, title: "Zara" },
    { icon: <SiReebok size={40} />, title: "Reebok" },
  ];

  const categories = [
    { icon: <IoShirtOutline size={40} />, title: "Men" },
    { icon: <PiPantsLight size={40} />, title: "Women" },
    { icon: <CgBoy size={40} />, title: "Kids" },
    { icon: <FiWatch size={40} />, title: "Accessories" },
    { icon: <GiRunningShoe size={40} />, title: "Footwear" },
    { icon: <GiRunningShoe size={40} />, title: "Electronics" },
  ];

  return (
    <div className="w-full">
      {/* Carousel Section */}
      <section className="mb-10">
        <Carousel />
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
    </div>
  );
};

export default Home;
