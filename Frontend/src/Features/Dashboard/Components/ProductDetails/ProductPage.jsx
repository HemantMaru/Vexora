import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiMinus,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useProducts } from "../../Hook/useProducts";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../../cart/Hook/useCart";

// Related Product Component
const RelatedProductCard = ({ item, handleGetProductDetails }) => {
  const navigate = useNavigate();
  const { handleSavedProduct, handleGetSavedProduct } = useProducts();
  const wishList = useSelector((state) => state.product.savedProduct) || [];
  const saved = wishList.some((e) => e._id === item._id);

  return (
    <div className="group flex flex-col cursor-pointer">
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--bg-secondary)]/50 mb-5 border border-[var(--border-color)]">
        {/* Wishlist Action */}
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await handleSavedProduct(item._id);
            await handleGetSavedProduct();
          }}
          className={`absolute top-3 right-3 z-20 p-2 md:p-3 border rounded-full transition-all duration-300 hover:scale-110 md:opacity-0 group-hover:opacity-100 shadow-sm ${
            saved
              ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)]"
              : "bg-[var(--bg-primary)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
          }`}
          title="Save to Wishlist"
        >
          <FiHeart
            size={16}
            className={`transition-colors ${saved ? "fill-current" : ""}`}
          />
        </button>

        {/* Image */}
        <img
          onClick={() => {
            handleGetProductDetails(item?._id);
            navigate(`/productDetails/${item._id}`);
          }}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
          src={item?.variants?.[0]?.image?.[0] || "/placeholder.jpg"}
          alt={item?.title || "Product"}
          loading="lazy"
        />

        {/* Quick View Button */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleGetProductDetails(item?._id);
              navigate(`/productDetails/${item._id}`);
            }}
            className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] md:text-xs font-bold uppercase tracking-widest py-4 hover:opacity-90 transition-colors border border-transparent"
          >
            View Product
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] truncate">
          {item?.title || "Product Item"}
        </h3>
        <p className="text-sm font-medium text-[var(--text-secondary)] tracking-wide">
          ₹{item?.variants?.[0]?.price?.amount || "---"}
        </p>
      </div>
    </div>
  );
};

// Main Page Component
const ProductPage = () => {
  const { handleGetProductDetails, handleGetProductByCategory } = useProducts();
  const { handleAddToCart } = useCart();
  const product = useSelector((state) => state.product.productsDetails);
  let Products = useSelector((state) => state.product.products);
  const { id } = useParams();
  const navigate = useNavigate();

  // Local States
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [openInfo, setOpenInfo] = useState("details");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  Products = product
    ? Products?.filter((p) => p._id !== product._id)
    : Products;
  let category = product?.category;

  // Initialize Product Data
  useEffect(() => {
    handleGetProductDetails(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedSize("");
    setQty(1);
    setOpenInfo("details");
  }, [id]);

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const firstAvailableColor = product.variants[0].color;
      setSelectedColor(firstAvailableColor);
      setCurrentImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    if (category) {
      handleGetProductByCategory(category);
    }
  }, [category]);

  // Variant Logic
  const variants = product?.variants || [];
  const uniqueColors = [...new Set(variants.map((v) => v.color))].filter(
    Boolean,
  );
  const colorVariants = variants.filter((v) => v.color === selectedColor);
  const displayImages = colorVariants.length > 0 ? colorVariants[0].image : [];
  const availableSizes = colorVariants.map((v) => v.size);

  const selectedVariant = variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize,
  );

  const displayPrice =
    selectedVariant?.price?.amount || colorVariants[0]?.price?.amount;
  const displayMRP =
    selectedVariant?.price?.mrp || colorVariants[0]?.price?.mrp;

  // Actions
  const handleAdd = async () => {
    if (!selectedVariant) return;
    await handleAddToCart({
      productId: product._id,
      variantId: selectedVariant._id,
      quantity: qty,
    });
  };

  const getColorThumbnail = (colorName) => {
    const variant = variants.find((v) => v.color === colorName);
    return variant?.image?.[0] || "/placeholder.jpg";
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize("");
    setCurrentImageIndex(0);
    setQty(1);
  };

  const toggleInfo = (section) => {
    setOpenInfo(openInfo === section ? null : section);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1,
    );
  };

  return (
    <section className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen animate-fade-in pb-24 font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* Functional Breadcrumb */}
      <div className="w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex items-center text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          <Link
            to="/"
            className="cursor-pointer hover:text-[var(--text-primary)] transition-colors"
          >
            HOME
          </Link>
          <span className="mx-3 text-[var(--border-color)]">/</span>
          <Link
            to="/shop"
            className="cursor-pointer hover:text-[var(--text-primary)] transition-colors"
          >
            SHOP
          </Link>
          <span className="mx-3 text-[var(--border-color)]">/</span>
          <Link
            to={`/shop?type=${category || ""}`}
            className="text-[var(--text-primary)] hover:opacity-70 transition-opacity"
          >
            {category || "CATEGORY"}
          </Link>
          <span className="mx-3 text-[var(--border-color)]">/</span>
          <span className="text-[var(--text-primary)] opacity-50 truncate max-w-[150px]">
            {product?.title || "PRODUCT"}
          </span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 flex flex-col lg:flex-row gap-16 xl:gap-24">
        {/* LEFT - ORIGINAL IMAGE VIEWER RESTORED */}
        <div className="w-full lg:w-[60%] flex flex-col-reverse md:flex-row gap-4 lg:gap-6">
          {/* Thumbnails */}
          {displayImages.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-20 xl:w-24 shrink-0 hide-scrollbar pb-2 md:pb-0 h-full max-h-[80vh]">
              {displayImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative w-20 md:w-full aspect-[3/4] cursor-pointer overflow-hidden transition-all duration-300 border-2 ${
                    currentImageIndex === i
                      ? "border-[var(--text-primary)] opacity-100"
                      : "border-transparent opacity-40 hover:opacity-80 grayscale-[20%]"
                  }`}
                >
                  <img
                    src={img}
                    loading="lazy"
                    alt={`Thumb ${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Image View - Exactly as you had it */}
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[80vh] md:max-h-[850px] bg-[var(--bg-secondary)]/10 flex-1 overflow-hidden group flex items-center justify-center border border-[var(--border-color)]">
            {displayImages.length > 0 ? (
              <img
                src={displayImages[currentImageIndex]}
                alt={product?.title || "Product"}
                className="w-full h-full object-cover md:object-contain transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              />
            ) : (
              <span className="text-[10px] font-mono tracking-widest animate-pulse text-[var(--text-secondary)]">
                LOADING_IMAGE...
              </span>
            )}

            {/* Carousel Navigation */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-0 h-full w-16 flex items-center justify-center text-[var(--text-primary)] opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-primary)]/10 transition-all duration-300"
                >
                  <FiChevronLeft size={32} strokeWidth={1} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-0 h-full w-16 flex items-center justify-center text-[var(--text-primary)] opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-primary)]/10 transition-all duration-300"
                >
                  <FiChevronRight size={32} strokeWidth={1} />
                </button>
                <div className="absolute bottom-4 right-4 bg-[var(--bg-primary)] border border-[var(--border-color)] px-3 py-1.5 text-[9px] font-bold font-mono tracking-widest z-10">
                  {currentImageIndex + 1} / {displayImages.length}
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT - PRODUCT DETAILS PANEL */}
        <div className="w-full lg:w-[40%] relative">
          <div className="lg:sticky lg:top-24 flex flex-col pb-10">
            {/* Title & Price */}
            <div className="flex flex-col mb-8 border-b border-[var(--border-color)] pb-8">
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black uppercase tracking-tighter text-[var(--text-primary)] leading-[0.85] mb-4">
                {product?.title || "PRODUCT NAME"}
              </h1>
              <div className="flex items-end gap-4">
                <p className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
                  {displayPrice ? `₹${displayPrice}` : "₹ --"}
                </p>
                {displayMRP && displayMRP > displayPrice && (
                  <p className="text-lg text-[var(--text-secondary)] line-through mb-1">
                    ₹{displayMRP}
                  </p>
                )}
              </div>
            </div>

            {/* Visual Color Selector */}
            {uniqueColors.length > 0 && (
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                    Color{" "}
                    <span className="text-[var(--text-primary)] ml-2">
                      {selectedColor}
                    </span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {uniqueColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      title={color}
                      className={`relative w-16 h-20 md:w-20 md:h-24 overflow-hidden border-2 transition-all duration-300 group ${
                        selectedColor === color
                          ? "border-[var(--text-primary)] shadow-[0_0_0_1px_var(--bg-primary)] scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={getColorThumbnail(color)}
                        alt={color}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                  Select Size
                </span>
                <span className="text-[9px] uppercase tracking-widest text-red-500 font-bold">
                  {selectedSize &&
                  selectedVariant?.stock < 5 &&
                  selectedVariant?.stock > 0
                    ? `Only ${selectedVariant.stock} Left`
                    : ""}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["S", "M", "L", "XL", "XXL"].map((s) => {
                  const isAvailable = availableSizes.includes(s);
                  return (
                    <button
                      key={s}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(s)}
                      className={`relative py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 border overflow-hidden ${
                        selectedSize === s
                          ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)]"
                          : isAvailable
                            ? "border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--text-primary)]"
                            : "border-[var(--border-color)]/30 text-[var(--text-secondary)]/30 cursor-not-allowed bg-[var(--bg-secondary)]/10"
                      }`}
                    >
                      {!isAvailable && (
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--text-secondary)]/30 -rotate-45"></div>
                      )}
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-[var(--border-color)] w-full sm:w-[140px] shrink-0 bg-transparent">
                <button
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="flex-1 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors flex justify-center"
                >
                  <FiMinus size={16} />
                </button>
                <span className="text-sm font-bold w-10 text-center font-mono">
                  {qty < 10 ? `0${qty}` : qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  disabled={selectedVariant && qty >= selectedVariant.stock}
                  className="flex-1 py-5 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors flex justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiPlus size={16} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={
                  !selectedSize ||
                  (selectedVariant && selectedVariant.stock === 0)
                }
                className={`group relative w-full flex items-center justify-center gap-4 px-8 py-5 overflow-hidden border transition-all duration-500 ${
                  selectedSize &&
                  (!selectedVariant || selectedVariant?.stock > 0)
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-[var(--text-primary)] cursor-pointer hover:bg-transparent hover:text-[var(--text-primary)]"
                    : "bg-transparent text-[var(--text-secondary)] border-[var(--border-color)] cursor-not-allowed opacity-50"
                }`}
              >
                <span className="relative z-10 text-xs font-bold uppercase tracking-[0.3em]">
                  {!selectedSize
                    ? "Select Size"
                    : selectedVariant?.stock === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                </span>
              </button>
            </div>

            {/* Information Accordions */}
            <div className="flex flex-col border-t-2 border-[var(--text-primary)]">
              <div className="border-b border-[var(--border-color)]">
                <button
                  onClick={() => toggleInfo("details")}
                  className="w-full py-6 flex justify-between items-center group"
                >
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
                    Product Details
                  </span>
                  <span
                    className={`transform transition-transform duration-500 ${openInfo === "details" ? "rotate-45" : "rotate-0"}`}
                  >
                    <FiPlus size={20} strokeWidth={1.5} />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${openInfo === "details" ? "max-h-96 opacity-100 pb-8" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium mb-6 whitespace-pre-wrap">
                    {product?.description ||
                      "Engineered for the modern environment. High-grade materials cut with precision."}
                  </p>
                </div>
              </div>

              <div className="border-b border-[var(--border-color)]">
                <button
                  onClick={() => toggleInfo("shipping")}
                  className="w-full py-6 flex justify-between items-center group"
                >
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
                    Shipping & Returns
                  </span>
                  <span
                    className={`transform transition-transform duration-500 ${openInfo === "shipping" ? "rotate-45" : "rotate-0"}`}
                  >
                    <FiPlus size={20} strokeWidth={1.5} />
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${openInfo === "shipping" ? "max-h-40 opacity-100 pb-8" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
                    Dispatch within 24 hours. Standard transit times apply.
                    Items may be returned in their original condition within 14
                    days of receipt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mt-24 md:mt-32">
        <div className="flex justify-between items-end mb-12 border-b-2 border-[var(--text-primary)] pb-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[var(--text-primary)] leading-none">
              Complete The Look
            </h2>
          </div>
        </div>

        {Products && Products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-16 md:gap-x-8">
            {Products.slice(0, 4).map((item) => (
              <RelatedProductCard
                key={item._id}
                item={item}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-32 text-center border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/10">
            <p className="text-2xl text-[var(--text-primary)] font-black uppercase tracking-tight">
              No Related Items Found
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
