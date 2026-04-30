import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../Hook/useProducts";
import { FiArrowLeft, FiTrash2, FiHeart, FiShoppingBag } from "react-icons/fi";

const Wishlist = () => {
  const wishList = useSelector((state) => state.product.savedProduct);
  const { handleGetSavedProduct, handleSavedProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSavedProduct();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* Top Navigation Bar - Solid background for high performance */}
      <div className="sticky top-0 z-50 w-full px-6 md:px-12 py-4 flex justify-between items-center bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FiArrowLeft size={18} /> Back
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
          <FiHeart size={14} className="text-[var(--text-primary)]" />
          <span>{wishList?.length || 0} Saved</span>
        </div>
      </div>

      <section className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12 pb-24">
        {/* Page Header */}
        <div className="mb-12 border-b border-[var(--border-color)] pb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[var(--text-primary)] mb-2">
            Your Wishlist
          </h1>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Items you have saved for later.
          </p>
        </div>

        {/* Wishlist Grid or Empty State */}
        {wishList?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {wishList.map((item) => {
              // Safely extract price to prevent UI crashes
              const itemPrice =
                item?.variants?.[0]?.price?.amount || item?.price || "---";

              return (
                <div
                  key={item._id}
                  onClick={() => navigate("/productDetails/" + item._id)}
                  className="group flex flex-col cursor-pointer relative"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/5] bg-[var(--bg-secondary)] overflow-hidden mb-4 border border-[var(--border-color)] group-hover:border-[var(--text-primary)] transition-colors duration-300">
                    {/* Fast Transform Animation on Hover */}
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      src={
                        item?.variants?.[0]?.image?.[0] || "/placeholder.jpg"
                      }
                      alt={item?.title}
                      loading="lazy"
                    />

                    {/* Dark gradient for text/button contrast (No blur used for performance) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Remove Item Button */}
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handleSavedProduct(item._id);
                        await handleGetSavedProduct();
                      }}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md hover:bg-red-600 hover:text-white z-20"
                      title="Remove from wishlist"
                    >
                      <FiTrash2 size={16} />
                    </button>

                    {/* Slide-Up Add To Cart Action */}
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                      <button
                        className="w-full bg-white text-black px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors duration-300 flex justify-center items-center gap-2 border border-transparent hover:border-[var(--border-color)]"
                        onClick={(e) => {
                          // Prevent navigation to details page when clicking this button
                          e.stopPropagation();
                          navigate("/productDetails/" + item._id);
                        }}
                      >
                        <FiShoppingBag size={14} /> View Product
                      </button>
                    </div>
                  </div>

                  {/* Product Details Block */}
                  <div className="flex flex-col gap-1 px-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold tracking-wide text-[var(--text-primary)] truncate group-hover:underline underline-offset-4 decoration-[var(--border-color)]">
                        {item?.title}
                      </h3>
                      <p className="text-sm font-bold text-[var(--text-primary)] ml-4 shrink-0 font-mono">
                        ₹{itemPrice}
                      </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                      {item?.category || "Apparel"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="w-full py-24 flex flex-col items-center justify-center gap-6 border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/10">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)]">
              <FiHeart size={24} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold uppercase tracking-widest text-[var(--text-primary)] mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-8">
                You haven't saved any items yet. Start exploring our collection.
              </p>
              <Link
                to="/shop"
                className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist;
