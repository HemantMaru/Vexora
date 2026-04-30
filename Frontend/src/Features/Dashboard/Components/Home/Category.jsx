import React from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      name: "Shirts",
      value: "shirts",
      image:
        "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/aaef3c11-531f-4996-bfdc-779c33ff0cec/1776404049.jpeg?w=90",
    },
    {
      id: 2,
      name: "T-Shirts",
      value: "tshirts",
      image:
        "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/5b1d3e8b-adff-4539-8be7-96d8c01c0d12/1776404128.jpeg?w=90",
    },
    {
      id: 3,
      name: "Jeans",
      value: "jeans",
      image:
        "https://d2d5n4ft74bagm.cloudfront.net/media/featured-category/59d59218-a414-4995-94c8-4aa61aae9ae0/1776404092.jpeg?w=90",
    },
    {
      id: 4,
      name: "Outerwear",
      value: "hoodies",
      image:
        "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MSWH9893-06-M-32.jpg?v=1755861470",
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-24 md:py-32 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
      {/* High-End Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[var(--text-primary)]"></span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">
              The Wardrobe
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter text-[var(--text-primary)] leading-none">
            Shop By <br className="hidden md:block" /> Category
          </h2>
        </div>

        <p className="text-sm font-medium text-[var(--text-secondary)] max-w-xs md:text-right uppercase tracking-widest leading-relaxed">
          Explore our curated collections for every occasion.
        </p>
      </div>

      {/* Cinematic Grid Layout */}
      {/* Mobile pe 1 column (massive impact), Tablet pe 2, Desktop pe 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate("/shop?type=" + item.value)}
            className="group relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[var(--bg-secondary)] cursor-pointer"
          >
            {/* Background Image with extremely smooth slow-zoom */}
            <img
              className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
              loading="lazy"
              src={item.image}
              alt={item.name}
            />

            {/* Smart Gradient Overlay: Ensures text is ALWAYS readable and adds mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

            {/* Interactive Content Container */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-between items-end">
                {/* Text Section */}
                <div className="flex flex-col">
                  {/* Subtle 'Explore' text reveals on hover */}
                  <span className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Explore
                  </span>
                  <h3 className="text-white text-3xl md:text-4xl font-bold uppercase tracking-tight">
                    {item.name}
                  </h3>
                </div>

                {/* Glassmorphism Arrow Button */}
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hover:bg-white hover:text-black shadow-xl">
                  {/* Custom Arrow SVG */}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Outline highlight effect on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 transition-colors duration-500 pointer-events-none z-10"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
