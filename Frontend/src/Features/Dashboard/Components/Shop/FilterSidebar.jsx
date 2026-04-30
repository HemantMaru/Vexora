import React, { useEffect, useState } from "react";
import { useProducts } from "../../Hook/useProducts";
import { useSelector } from "react-redux";

const FilterSidebar = () => {
  const { handleGetProductByCategory } = useProducts();
  const sort = useSelector((state) => state.product.sort);

  // States
  const [category, setCategory] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const MAX_PRICE = 5000;

  useEffect(() => {
    // API Call - You can also pass priceRange.min and max here if your backend supports it
    handleGetProductByCategory(category.join(","), sort);
  }, [category, sort]);

  const categories = ["shirts", "tshirts", "jeans", "hoodies", "jackets"];

  // Handlers
  const toggleCategory = (cat) => {
    setCategory((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange.max - 100);
    setPriceRange((prev) => ({ ...prev, min: value }));
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange.min + 100);
    setPriceRange((prev) => ({ ...prev, max: value }));
  };

  const clearFilters = () => {
    setCategory([]);
    setPriceRange({ min: 0, max: MAX_PRICE });
  };

  // Slider Math
  const minPercent = (priceRange.min / MAX_PRICE) * 100;
  const maxPercent = (priceRange.max / MAX_PRICE) * 100;

  return (
    <div className="flex flex-col gap-12 pr-0 lg:pr-6">
      {/* Header Area */}
      <div className="flex justify-between items-end pb-4 border-b-2 border-[var(--text-primary)]">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-primary)]">
          Filters
        </h3>
        <button
          onClick={clearFilters}
          disabled={
            category.length === 0 &&
            priceRange.min === 0 &&
            priceRange.max === MAX_PRICE
          }
          className={`text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
            category.length > 0 ||
            priceRange.min > 0 ||
            priceRange.max < MAX_PRICE
              ? "text-[var(--text-primary)] hover:opacity-50"
              : "text-[var(--text-secondary)] opacity-30 cursor-not-allowed"
          }`}
        >
          [ Reset ]
        </button>
      </div>

      {/* Category Toggles (Restored Brutalist Style) */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--text-primary)]"></div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            Categories
          </h4>
        </div>

        <div className="flex flex-col gap-0 border border-[var(--border-color)]">
          {categories.map((cat, idx) => {
            const isChecked = category.includes(cat);
            return (
              <button
                key={idx}
                onClick={() => toggleCategory(cat)}
                className={`w-full text-left px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 border-b border-[var(--border-color)] last:border-b-0 flex justify-between items-center group ${
                  isChecked
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                    : "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                <span
                  className={`${isChecked ? "" : "group-hover:translate-x-2"} transition-transform duration-300`}
                >
                  {cat.replace("-", " ")}
                </span>
                {isChecked && (
                  <span className="font-mono text-[9px] tracking-widest">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* WORKING Brutalist Price Range */}
      <div className="flex flex-col gap-6 pt-6 border-t border-[var(--border-color)]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--text-primary)] opacity-30"></div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Price Range
            </h4>
          </div>
          <span className="text-[9px] font-mono font-bold tracking-widest text-[var(--text-primary)]">
            ₹{priceRange.min} — ₹
            {priceRange.max === MAX_PRICE ? `${MAX_PRICE}+` : priceRange.max}
          </span>
        </div>

        {/* Working Slider Track */}
        <div className="relative w-full h-[1px] bg-[var(--border-color)] mt-2">
          {/* Active Highlight Line */}
          <div
            className="absolute h-full bg-[var(--text-primary)]"
            style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          ></div>

          {/* Invisible HTML Inputs (Overlapping for interaction) */}
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            step="100"
            value={priceRange.min}
            onChange={handleMinChange}
            className="absolute w-full -top-3 h-6 opacity-0 cursor-ew-resize pointer-events-auto"
            style={{ zIndex: priceRange.min > MAX_PRICE - 200 ? 5 : 3 }}
          />
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            step="100"
            value={priceRange.max}
            onChange={handleMaxChange}
            className="absolute w-full -top-3 h-6 opacity-0 cursor-ew-resize pointer-events-auto"
            style={{ zIndex: 4 }}
          />

          {/* Brutalist Boxy Thumbs (Restored) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-4 bg-[var(--text-primary)] pointer-events-none transition-transform duration-100"
            style={{ left: `calc(${minPercent}% - 4px)` }}
          ></div>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-4 bg-[var(--text-primary)] pointer-events-none transition-transform duration-100"
            style={{ left: `calc(${maxPercent}% - 4px)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
