import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { label: "Minutes", href: null, imgSrc: "/images/scooty.jpg", alt: "Minutes" },
  { label: "Mobiles & Tablets", href: null, imgSrc: "/images/phone.jpg", alt: "Mobiles & Tablets" },
  { label: "Fashion", href: null, imgSrc: "/images/faishon3.jpg", alt: "Fashion" },
  { label: "Electronics", href: null, imgSrc: "/images/laptop2.jpg", alt: "Electronics" },
  { label: "Home & Furniture", href: null, imgSrc: "/images/sofa2.jpg", alt: "Home & Furniture" },
  { label: "TVs & Appliances", href: null, imgSrc: "/images/Appliances.webp", alt: "TVs & Appliances" },
  { label: "Accessories", href: null, imgSrc: "/images/accessories5.jpg", alt: "Accessories" },
  { label: "Beauty, Food..", href: null, imgSrc: "/images/toy.png", alt: "Beauty, Food.." },
  { label: "Grocery", href: null, imgSrc: "/images/grocery2.jpg", alt: "Grocery" },
];

export default function CategoryNav() {
  return (
    <nav className="bg-gray-100 py-2 sm:px-8 shadow-lg relative">
      <div className="max-w-full mx-auto bg-white">
        {/* Mobile swipe / Desktop grid */}
        <div
          className="
            flex sm:flex-wrap gap-8
            overflow-x-auto sm:overflow-visible
            snap-x snap-mandatory scroll-smooth
            scrollbar-hide pr-6 justify-center
          "
        >
          {categories.map(({ label, href, imgSrc, alt }) => {
            const content = (
              <>
                <div className="w-16 h-16 mb-2 flex items-center justify-center">
                  <img src={imgSrc} alt={alt} className="max-w-full max-h-full" />
                </div>
                <span className="truncate font-medium">{label}</span>
              </>
            );

            return (
              <div
                key={label}
                className="
                  flex-none w-1/2 xs:w-1/3 sm:w-24 
                  h-28 text-center text-sm text-gray-800
                  snap-start
                "
              >
                {href ? (
                  <Link
                    to={href}
                    className="flex flex-col items-center justify-center hover:text-blue-600"
                    aria-label={label}
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center cursor-default select-none mt-2"
                    aria-label={label}
                  >
                    {content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right fade effect for mobile */}
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white sm:hidden pointer-events-none"></div>
      </div>
    </nav>
  );
}
