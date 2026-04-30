import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowLeft, FiShoppingBag } from "react-icons/fi";

import CartList from "../Components/Cart/CartList.jsx";
import CartSummary from "../Components/Cart/CartSummary.jsx";
import { useCart } from "../../cart/Hook/useCart.js";

const CartPage = () => {
  const { fetchCart } = useCart();
  const navigate = useNavigate();

  // Safe extraction for aggregated or normal cart data
  const rawCart = useSelector((state) => state.cart.cartItems);
  let cartItems = [];
  if (Array.isArray(rawCart) && rawCart.length > 0 && rawCart[0].items) {
    cartItems = rawCart[0].items;
  } else if (rawCart?.items) {
    cartItems = rawCart.items;
  } else if (Array.isArray(rawCart)) {
    cartItems = rawCart;
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] animate-fade-in pb-20 font-sans selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 w-full px-6 md:px-12 py-4 flex justify-between items-center bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <FiArrowLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">
          <FiShoppingBag size={14} className="text-[var(--text-primary)]" />
          <span>{totalItems} Items</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="mb-12 border-b border-[var(--border-color)] pb-8">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[var(--text-primary)] mb-2">
            Your Cart
          </h1>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Review your selected items before checkout.
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* LEFT SIDE: LIST */}
            <div className="w-full lg:w-[65%]">
              <CartList cartItems={cartItems} />
            </div>

            {/* RIGHT SIDE: SUMMARY */}
            <div className="w-full lg:w-[35%]">
              <CartSummary cartItems={cartItems} />
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)]/10">
            <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] mb-6">
              <FiShoppingBag size={24} />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-[var(--text-primary)] mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8 text-center max-w-sm">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CartPage;
