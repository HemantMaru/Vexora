import React from "react";
import { setSort } from "../../State/products.slice";
import { useDispatch, useSelector } from "react-redux";

const SortBar = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.product.sort);
  const products = useSelector((state) => state.product.products) || [];
  const productsCount = products.length;

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      {/* Results Counter */}
      <p className="text-xs font-medium tracking-wide text-[var(--text-secondary)]">
        Showing {productsCount} Product{productsCount !== 1 ? "s" : ""}
      </p>

      {/* Sorting Dropdown */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] hidden sm:block">
          Sort By:
        </label>

        <div className="relative group">
          <select
            onChange={(e) => dispatch(setSort(e.target.value))}
            value={sort}
            // Uses CSS variables to automatically adapt to Dark/Light mode
            className="peer appearance-none bg-transparent text-[var(--text-primary)] text-xs sm:text-sm font-bold uppercase tracking-wider outline-none cursor-pointer border-none py-2 pl-2 pr-8 focus:ring-0 transition-colors"
          >
            <option
              value="newest"
              className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
            >
              Newest Arrivals
            </option>
            <option
              value="price-low"
              className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
            >
              Price: Low to High
            </option>
            <option
              value="price-high"
              className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
            >
              Price: High to Low
            </option>
          </select>

          {/* Arrow Icon */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            <svg
              className="w-4 h-4 transition-transform duration-300 peer-focus:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
