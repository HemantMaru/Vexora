import React, { useEffect } from "react";
import FilterSidebar from "../Components/Shop/FilterSidebar";
import SortBar from "../Components/Shop/SortBar";
import ProductGrid from "../Components/Shop/ProductGrid";
import { useProducts } from "../Hook/useProducts";

const Shop = () => {
  const { handleGetSavedProduct } = useProducts();

  useEffect(() => {
    handleGetSavedProduct();
  }, []);

  return (
    <div className="w-full bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] flex flex-col">
      {/* Premium Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-70">
          <img
            src="https://images.pexels.com/photos/6956915/pexels-photo-6956915.jpeg"
            alt="New Collection"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Season 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4 drop-shadow-md">
            The Collection
          </h1>

          <p className="text-sm text-white/80 font-medium tracking-wide max-w-xl leading-relaxed">
            Discover our latest arrivals. Premium quality, modern silhouettes,
            and timeless designs crafted for everyday wear.
          </p>
        </div>
      </div>

      {/* Clean Marquee Banner */}
      <div className="w-full overflow-hidden bg-[var(--text-primary)] text-[var(--bg-primary)] py-3">
        <div
          className="whitespace-nowrap flex items-center text-xs font-bold uppercase tracking-widest"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          <span className="mx-8">
            COMPLIMENTARY SHIPPING ON ORDERS OVER ₹4999
          </span>
          <span className="mx-8">NEW ARRIVALS ADDED DAILY</span>
          <span className="mx-8">PREMIUM QUALITY MATERIALS</span>
          <span className="mx-8">
            COMPLIMENTARY SHIPPING ON ORDERS OVER ₹4999
          </span>
          <span className="mx-8">NEW ARRIVALS ADDED DAILY</span>
          <span className="mx-8">PREMIUM QUALITY MATERIALS</span>
        </div>
      </div>

      {/* Main Shop Layout */}
      <section className="w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-[300px] w-full shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border-color)] p-6 md:p-10">
            <div className="lg:sticky lg:top-24 h-fit">
              <FilterSidebar />
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 flex flex-col p-6 md:p-10 min-h-[80vh]">
            <div className="mb-8 pb-4 border-b border-[var(--border-color)]">
              <SortBar />
            </div>
            <ProductGrid />
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Shop;
