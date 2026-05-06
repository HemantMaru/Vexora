import React, { useState } from "react";
import { useRazorpay } from "react-razorpay";
import { useCart } from "../../../cart/Hook/useCart";
import { useSelector } from "react-redux";
const CartSummary = ({ cartItems }) => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const { handleCreateOrder, handleVerifyPayment, fetchCart } = useCart();
  const user = useSelector((state) => state.auth.user);
  // Use populated price if available, otherwise fallback to priceAtPurchase
  const subtotal = cartItems.reduce((acc, item) => {
    const currentPrice =
      item.product?.variants?.price?.amount || item.priceAtPurchase;
    return acc + currentPrice * item.quantity;
  }, 0);

  const shippingFee = subtotal > 4999 ? 0 : 150;
  const total = subtotal + shippingFee;
  console.log("TOTAL:", total);
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    if (loading) return; //  prevent double call
    setLoading(true);

    const order = await handleCreateOrder();

    const razorOrder = order.razorOrder; // 🔥 IMPORTANT

    const options = {
      key: "rzp_test_SkrnHl5nSAY94o",
      amount: razorOrder.amount, // ✅ FIX
      currency: razorOrder.currency,
      name: "Vexora",
      description: "payment Transaction",
      order_id: razorOrder.id, // ✅ FIX

      handler: async (response) => {
        const verifyRes = await handleVerifyPayment(response);

        if (verifyRes?.success) {
          await fetchCart(); //  redux/cart update
          window.location.href = "/order-success";
        }
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();

    setLoading(false);
  };
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
        onClick={handlePayment}
        disabled={loading || cartItems.length === 0}
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
