import React from "react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import { useCart } from "../../../cart/Hook/useCart.js";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const { handleUpdate, handleRemove } = useCart();
  const navigate = useNavigate();

  // Extracting Populated Data Safely
  const productData = item.product || {};
  const productId = productData._id || item.product;
  const variantId = item.variant;
  const title = productData.title || "Product Item";

  // 🚨 THE REAL FIX IS HERE: Variants ek array hai, toh sahi variant dhoondhna padega
  const variantsArray = Array.isArray(productData.variants)
    ? productData.variants
    : [];
  const currentVariant = variantsArray.find((v) => v._id === variantId) || {};

  // Price & Stock
  const currentPrice =
    currentVariant.price?.amount || item.priceAtPurchase || 0;

  // Agar backend se stock na mile, toh fallback 100 de do taaki + button disable na ho!
  const stockAvailable = currentVariant.stock ?? 100;

  return (
    <div className="flex flex-col sm:flex-row py-6 gap-6 sm:gap-8 group">
      {/* ITEM IMAGE */}
      <div
        onClick={() => navigate(`/ProductDetails/${productId}`)}
        className="w-full sm:w-[120px] aspect-[4/5] bg-[var(--bg-secondary)] border border-[var(--border-color)] shrink-0 overflow-hidden relative cursor-pointer"
      >
        <img
          src={currentVariant.image?.[0] || item.image || "/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* ITEM DETAILS */}
      <div className="flex flex-col flex-1 justify-between py-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1.5">
            <h3
              onClick={() => navigate(`/ProductDetails/${productId}`)}
              className="text-base md:text-lg font-bold uppercase tracking-wide text-[var(--text-primary)] cursor-pointer hover:underline underline-offset-4 decoration-[var(--border-color)] line-clamp-1"
            >
              {title}
            </h3>

            {/* Variant Details */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Color:{" "}
                <span className="text-[var(--text-primary)]">{item.color}</span>
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Size:{" "}
                <span className="text-[var(--text-primary)]">{item.size}</span>
              </p>
            </div>

            <p className="text-[10px] font-mono text-[var(--text-secondary)] mt-1 uppercase">
              ID: {productId.toString().slice(-8)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => handleRemove(productId, variantId)}
            className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1"
            title="Remove Item"
          >
            <FiX size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* PRICE & QUANTITY */}
        <div className="flex justify-between items-end mt-6">
          <div className="flex items-center border border-[var(--border-color)] bg-transparent">
            {/* MINUS BUTTON */}
            <button
              onClick={() =>
                handleUpdate({
                  productId,
                  variantId,
                  quantity: item.quantity - 1,
                })
              }
              className="px-3 py-2 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors text-[var(--text-primary)]"
            >
              <FiMinus size={14} />
            </button>

            {/* QUANTITY */}
            <span className="w-8 text-center font-mono text-sm font-bold text-[var(--text-primary)]">
              {item.quantity}
            </span>

            {/* PLUS BUTTON (Ab properly chalega!) */}
            <button
              disabled={item.quantity >= stockAvailable}
              onClick={() =>
                handleUpdate({
                  productId,
                  variantId,
                  quantity: item.quantity + 1,
                })
              }
              className="px-3 py-2 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--text-primary)]"
            >
              <FiPlus size={14} />
            </button>
          </div>

          {/* PRICING */}
          <div className="flex flex-col text-right">
            <p className="text-lg font-mono font-bold text-[var(--text-primary)]">
              ₹{currentPrice * item.quantity}
            </p>
            {item.quantity > 1 && (
              <p className="text-[10px] font-mono text-[var(--text-secondary)]">
                ₹{currentPrice} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
