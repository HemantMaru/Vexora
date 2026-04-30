import React from "react";
import CartItem from "./CartItem";

const CartList = ({ cartItems }) => {
  return (
    <div className="flex flex-col">
      {/* Header row for desktop */}
      <div className="hidden sm:flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-4 mb-4">
        <span className="w-[120px]">Product</span>
        <span className="flex-1 px-8">Details</span>
        <span>Quantity & Price</span>
      </div>

      <div className="flex flex-col divide-y divide-[var(--border-color)]">
        {cartItems.map((item, index) => (
          <CartItem
            key={`${item.product?._id || item.product}-${item.variant}-${index}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default CartList;
