import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiShoppingBag } from "react-icons/fi";

const Features = () => {
  const navigate = useNavigate();

  // Real-world e-commerce data format
  const featuredProducts = [
    {
      id: 1,
      title: "Signature Linen Shirt",
      price: "₹1,999",
      category: "shirts",
      image:
        "https://d2d5n4ft74bagm.cloudfront.net/media/banners/f60a0f10-ed69-47cb-b82d-6604c344666f/1775472640.jpeg?w=90",
      description: "Lightweight and breathable. Perfect for warm weather.",
    },
    {
      id: 2,
      title: "Classic Relaxed Fit Jeans",
      price: "₹2,499",
      category: "jeans",
      image:
        "https://d2d5n4ft74bagm.cloudfront.net/media/banners/d344a7dc-7977-4463-935c-de212f93ea97/1775472623.jpeg?w=90",
      description: "Everyday comfort with a timeless straight leg cut.",
    },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-20 md:py-32 bg-[var(--bg-primary)] border-t border-[var(--border-color)] overflow-hidden">
      {/* Clear & Premium Header */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-4">
            <span className="w-8 md:w-12 h-[2px] bg-[var(--text-primary)]"></span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Trending Now
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-[0.9]">
            Featured <br className="hidden md:block" /> Styles.
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6">
          <p className="text-sm font-medium text-[var(--text-secondary)] max-w-xs md:text-right leading-relaxed">
            Discover our top picks of the season. Handpicked essentials designed
            for everyday comfort and style.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] hover:opacity-70 transition-opacity"
          >
            Shop All
            <FiArrowUpRight className="text-lg transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Asymmetric Grid Layout (Preserved for high-end look) */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {featuredProducts.map((item, index) => (
          <div
            key={item.id}
            // 7 columns for the first, 5 for the second (pushed down slightly)
            className={`group relative w-full cursor-pointer flex flex-col ${
              index === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"
            }`}
            onClick={() => navigate("/shop?type=" + item.category)}
          >
            {/* Image Container with Smooth Zoom */}
            <div
              className={`relative w-full overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] transition-colors duration-500 group-hover:border-[var(--text-primary)] ${
                index === 0 ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/5]"
              }`}
            >
              <img
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                src={item.image}
                alt={item.title}
                loading="lazy"
              />

              {/* Action Overlay */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500 z-10 flex items-center justify-center">
                {/* Floating "View Product" Button */}
                <div className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-transform">
                    <FiShoppingBag size={20} />
                  </div>
                  <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded shadow-md">
                    View Product
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info Block */}
            <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                  Top Pick // {item.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)] group-hover:underline underline-offset-4 decoration-[var(--border-color)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-medium max-w-sm mt-1">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-4 sm:ml-auto">
                <p className="text-xl font-bold font-mono text-[var(--text-primary)]">
                  {item.price}
                </p>
                <div className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-colors duration-300 shadow-sm">
                  <FiArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
