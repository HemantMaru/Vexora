import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../../Hook/useProducts";
import { useSelector } from "react-redux";
import { FiHeart } from "react-icons/fi";

// Loading Skeleton
const SkeletonCard = () => (
  <div className="flex flex-col animate-pulse">
    <div className="w-full aspect-[4/5] bg-[var(--border-color)]/20 mb-4 rounded-md"></div>
    <div className="h-4 bg-[var(--border-color)]/30 w-3/4 mb-2 rounded"></div>
    <div className="h-4 bg-[var(--border-color)]/20 w-1/3 rounded"></div>
  </div>
);

// Individual Product Card
const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { handleGetProductDetails, handleSavedProduct, handleGetSavedProduct } =
    useProducts();

  const variants = item.variants || [];
  const wishList = useSelector((state) => state.product.savedProduct) || [];

  const uniqueColors = [...new Set(variants.map((v) => v.color))].filter(
    Boolean,
  );
  const [activeColor, setActiveColor] = useState(uniqueColors[0]);

  const displayVariant =
    variants.find((v) => v.color === activeColor) || variants[0];

  const getSwatchImage = (colorName) => {
    return (
      variants.find((v) => v.color === colorName)?.image?.[0] ||
      "/placeholder.jpg"
    );
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    handleGetProductDetails(item._id);
    navigate(`/productDetails/${item._id}`);
  };

  const saved = wishList.some((e) => e._id === item._id);

  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    await handleSavedProduct(item._id);
    await handleGetSavedProduct();
  };

  return (
    <div
      className="group flex flex-col relative bg-transparent cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[var(--bg-secondary)]/30 mb-4 transition-colors duration-300">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full transition-all duration-300 hover:scale-110 md:opacity-0 group-hover:opacity-100 shadow-sm
            ${
              saved
                ? "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                : "bg-white text-black hover:bg-black hover:text-white"
            }
          `}
          title="Save to Wishlist"
        >
          <FiHeart
            size={16}
            className={`transition-colors ${saved ? "fill-current" : ""}`}
          />
        </button>

        {/* Product Image */}
        <img
          src={displayVariant?.image?.[0] || "/placeholder.jpg"}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button className="w-full bg-white text-black text-xs font-bold uppercase tracking-widest py-3.5 hover:bg-black hover:text-white transition-colors shadow-md">
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold tracking-wide text-[var(--text-primary)] truncate group-hover:underline underline-offset-4 decoration-[var(--border-color)]">
            {item.title}
          </h3>
          <p className="text-sm font-bold text-[var(--text-primary)] font-mono ml-4 shrink-0">
            ₹{displayVariant?.price?.amount || "0.00"}
          </p>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-2">
          {item.category || "Apparel"}
        </p>

        {/* Color Swatches (Click Only) */}
        {uniqueColors.length > 1 && (
          <div className="flex items-center gap-2 mt-1">
            {uniqueColors.map((color) => (
              <button
                key={color}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents navigating to product page when clicking color
                  setActiveColor(color);
                }}
                title={color}
                className={`w-5 h-5 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                  activeColor === color
                    ? "border-[var(--text-primary)] p-[1px]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={getSwatchImage(color)}
                  alt={color}
                  className="w-full h-full object-cover rounded-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Grid Display
const ProductGrid = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  const AllProducts = useSelector((state) => state.product.products) || [];
  const Loading = useSelector((state) => state.product.loading);
  const navigate = useNavigate();

  const Products = type
    ? AllProducts.filter((p) => p.category === type)
    : AllProducts;

  if (Loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
      {Products?.map((item) => (
        <ProductCard key={item._id} item={item} />
      ))}

      {/* Clean Empty State */}
      {Products?.length === 0 && !Loading && (
        <div className="col-span-full py-24 flex flex-col items-center justify-center border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/10 rounded-lg">
          <p className="text-lg font-bold text-[var(--text-primary)] mb-2">
            No products found
          </p>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="text-xs font-bold uppercase tracking-widest text-[var(--bg-primary)] bg-[var(--text-primary)] px-8 py-3 hover:opacity-80 transition-opacity"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
