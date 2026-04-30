import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../Dashboard/Hook/useProducts";
import { useSelector } from "react-redux";
import {
  FiArrowLeft,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiActivity,
} from "react-icons/fi";

const SellerProducts = () => {
  const { handleGetSellerProducts, handleDeleteProduct } = useProducts();
  const Products = useSelector((state) => state.product.sellerProducts);
  const navigate = useNavigate();

  // Infinite Scrolling Logic
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const observer = useRef();

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const visibleProducts = Products?.slice(0, page * ITEMS_PER_PAGE) || [];

  const lastProductElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          visibleProducts.length < Products.length
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [visibleProducts.length, Products?.length],
  );

  return (
    <section className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* Top Control Bar - Solid background for better scroll performance */}
      <div className="sticky top-0 z-50 w-full px-6 md:px-12 py-4 flex justify-between items-center bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FiArrowLeft size={18} /> Back
          </button>
          <div className="w-px h-6 bg-[var(--border-color)] hidden md:block"></div>
          <div className="hidden md:flex items-center gap-2">
            <FiActivity className="text-green-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
              Store Active
            </p>
          </div>
        </div>

        <Link
          to="/addProduct"
          className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <FiPlus size={16} /> Add Product
        </Link>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12 pb-32">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--text-primary)] mb-2 uppercase">
              Your Products
            </h1>
            <p className="text-sm font-medium text-[var(--text-secondary)] max-w-xl">
              You have {Products?.length || 0} products currently listed in your
              store.
            </p>
          </div>
        </div>

        {/* Products Grid / Empty State */}
        {Products?.length === 0 ? (
          /* Empty State */
          <div className="w-full py-24 flex flex-col items-center justify-center gap-4 border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/10">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Your store is empty
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Start adding products to see them listed here.
            </p>
            <Link
              to="/addProduct"
              className="border border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-[var(--text-primary)] transition-colors"
            >
              Add Your First Product
            </Link>
          </div>
        ) : (
          /* Products Grid with Fast Scroll Optimization */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {visibleProducts.map((product, index) => {
              const isLastElement = visibleProducts.length === index + 1;

              return (
                <div
                  ref={isLastElement ? lastProductElementRef : null}
                  key={product._id}
                  className="group relative w-full flex flex-col bg-transparent overflow-hidden"
                  style={{ willChange: "transform" }}
                >
                  {/* Image Container */}
                  <div
                    className="w-full aspect-[4/5] bg-[var(--bg-secondary)] overflow-hidden relative cursor-pointer border border-[var(--border-color)] transition-colors duration-300 group-hover:border-[var(--text-primary)]"
                    onClick={() => navigate("/addProduct/" + product._id)}
                  >
                    <img
                      src={
                        product?.variants?.[0]?.image[0] || "/placeholder.jpg"
                      }
                      alt={product?.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Performance-friendly gradient overlay (No blur) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                    {/* Top Info Tags */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                      <span className="bg-white text-black px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border border-black/10 shadow-sm">
                        {product?.category || "Product"}
                      </span>
                      <span className="text-[10px] text-white/90 font-mono tracking-widest uppercase bg-black/60 px-2 py-1">
                        ID: {product._id.slice(-6)}
                      </span>
                    </div>

                    {/* Bottom Product Info */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 transform transition-transform duration-300 ease-out group-hover:-translate-y-14">
                      <h3 className="text-base font-bold uppercase tracking-tight text-white mb-1 truncate">
                        {product?.title}
                      </h3>
                      <p className="text-sm font-bold text-white/90">
                        {product?.variants?.[0]?.price.currency === "INR"
                          ? "₹"
                          : "$"}
                        {product?.variants?.[0]?.price?.amount || "0.00"}
                      </p>
                    </div>

                    {/* Hover Action Dock - Solid colors, no blur for fast rendering */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/addProduct/" + product._id);
                        }}
                        className="w-10 h-10 rounded-full bg-white flex justify-center items-center text-black hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors shadow-md"
                        title="Edit Product"
                      >
                        <FiEdit2 size={16} />
                      </button>

                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?",
                            )
                          ) {
                            await handleDeleteProduct(product._id);
                            setPage(1);
                            await handleGetSellerProducts();
                          }
                        }}
                        className="w-10 h-10 rounded-full bg-white flex justify-center items-center text-black hover:bg-red-600 hover:text-white transition-colors shadow-md"
                        title="Delete Product"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Loading Indicator */}
        {visibleProducts.length > 0 &&
          visibleProducts.length < Products.length && (
            <div className="w-full flex justify-center mt-12">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
                <span className="w-2 h-2 bg-[var(--text-secondary)] rounded-full animate-pulse"></span>
                Loading more products...
              </div>
            </div>
          )}
      </div>
    </section>
  );
};

export default SellerProducts;
