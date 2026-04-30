import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Newarrival = () => {
  const navigate = useNavigate();

  // 🔥 FETCHING REAL DATA FROM REDUX STORE 🔥
  const allProducts = useSelector((state) => state.product.products) || [];

  // Grab the latest 4 products for the "New Arrivals" section
  // Note: Adjust the sorting logic here if you want strictly the newest dates
  const products = allProducts.slice(0, 4);

  // State to track which product is currently being hovered/viewed
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect for mobile devices where hover isn't natural
  useEffect(() => {
    if (window.innerWidth < 768 && products.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((current) =>
          current === products.length - 1 ? 0 : current + 1,
        );
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [products]);

  // Fallback if no products are loaded yet
  if (products.length === 0) {
    return null; // Or return a sleek skeleton loader
  }

  return (
    <section className="w-full py-16 md:py-24 bg-[var(--bg-primary)] overflow-hidden border-t border-[var(--border-color)]">
      {/* Header Area */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-end mb-12 md:mb-16">
        <div>
          <p className="text-[var(--text-secondary)] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">
            Season Highlights
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[var(--text-primary)] leading-none">
            New Arrivals
          </h2>
        </div>
        <button
          onClick={() => navigate("/shop?sort=newest")}
          className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] hover:opacity-60 transition-opacity"
        >
          View All <FiArrowRight size={14} />
        </button>
      </div>

      {/* Main Interactive Showcase Layout */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
        {/* LEFT: Dynamic Interactive List */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10">
          {products.map((item, index) => {
            const isActive = activeIndex === index;
            // Get the first variant's price
            const displayPrice = item?.variants?.[0]?.price?.amount || "0.00";

            return (
              <div
                key={item._id || index}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  setActiveIndex(index);
                  // Double click navigates to product
                  if (isActive) navigate(`/productDetails/${item._id}`);
                }}
                className="group relative flex items-center justify-between py-6 md:py-8 lg:py-10 border-b border-[var(--border-color)] cursor-pointer transition-colors duration-300"
              >
                {/* Active Highlight Background Line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--text-primary)] transition-all duration-300"></div>
                )}

                <div className="flex flex-col gap-1 md:gap-2 relative z-10 pl-4 md:pl-6">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-[var(--text-secondary)]">
                    0{index + 1} / {item.category || "Apparel"}
                  </span>
                  <h3
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold tracking-tight transition-all duration-500 origin-left ${
                      isActive
                        ? "text-[var(--text-primary)] translate-x-2"
                        : "text-[var(--text-secondary)] opacity-50 group-hover:opacity-100"
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Animated Details (Price & Icon) visible only when active */}
                <div
                  className={`flex items-center gap-6 transition-all duration-500 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4 pointer-events-none"
                  }`}
                >
                  <p className="text-base md:text-lg font-mono font-bold text-[var(--text-primary)] hidden sm:block">
                    ₹{displayPrice}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/productDetails/${item._id}`);
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--text-primary)] bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-300 shadow-sm"
                  >
                    <FiArrowRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Sticky Cinematic Image Viewer */}
        <div className="w-full lg:w-1/2 aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[75vh] relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)]">
          {products.map((item, index) => {
            const displayImage =
              item?.variants?.[0]?.image?.[0] || "/placeholder.jpg";

            return (
              <img
                key={item._id || index}
                src={displayImage}
                alt={item.title}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000 ease-out ${
                  activeIndex === index
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                }`}
              />
            );
          })}

          {/* Overlay gradient for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-20 pointer-events-none"></div>

          {/* Quick Action Overlay (Visible on Desktop) */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-[250px] z-30 transform transition-transform duration-500">
            <button
              onClick={() =>
                navigate(`/productDetails/${products[activeIndex]?._id}`)
              }
              className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-4 px-6 hover:bg-black hover:text-white transition-colors shadow-xl"
            >
              View Product
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View All Button */}
      <div className="px-6 mt-8 sm:hidden">
        <button
          onClick={() => navigate("/shop?sort=newest")}
          className="w-full border border-[var(--text-primary)] text-[var(--text-primary)] py-4 text-xs font-bold uppercase tracking-widest active:bg-[var(--text-primary)] active:text-[var(--bg-primary)] transition-colors"
        >
          View All New Arrivals
        </button>
      </div>
    </section>
  );
};

export default Newarrival;
