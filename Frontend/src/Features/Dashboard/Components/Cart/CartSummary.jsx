import React from "react";

const CartSummary = ({ cartItems }) => {
  // Use populated price if available, otherwise fallback to priceAtPurchase
  const subtotal = cartItems.reduce((acc, item) => {
    const currentPrice =
      item.product?.variants?.price?.amount || item.priceAtPurchase;
    return acc + currentPrice * item.quantity;
  }, 0);

  const shippingFee = subtotal > 4999 ? 0 : 150;
  const total = subtotal + shippingFee;

  return (
    <div className="w-full bg-[var(--bg-secondary)]/10 border border-[var(--border-color)] p-6 md:p-8 lg:sticky lg:top-24 text-[var(--text-primary)]">
      <h2 className="text-sm font-bold uppercase tracking-widest border-b border-[var(--border-color)] pb-4 mb-6">
        Order Summary
      </h2>

      <div className="flex flex-col gap-4 text-sm mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)] font-medium">
            Subtotal
          </span>
          <span className="font-bold font-mono">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[var(--text-secondary)] font-medium">
            Shipping
          </span>
          <span className="font-bold font-mono">
            {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-[var(--border-color)] pt-6 mb-8">
        <span className="text-base font-bold uppercase tracking-widest">
          Total
        </span>
        <span className="text-2xl font-bold font-mono">
          ₹{total.toLocaleString()}
        </span>
      </div>

      <button
        disabled={cartItems.length === 0}
        className="w-full flex items-center justify-center px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-xs font-bold uppercase tracking-widest">
          Proceed to Checkout
        </span>
      </button>

      {/* FOOTER NOTES */}
      <div className="mt-6 flex flex-col gap-2">
        <p className="text-[10px] text-[var(--text-secondary)] text-center font-medium">
          Taxes will be calculated at checkout.
        </p>
        <p className="text-[10px] text-[var(--text-secondary)] text-center font-medium">
          Secure encrypted payment.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
