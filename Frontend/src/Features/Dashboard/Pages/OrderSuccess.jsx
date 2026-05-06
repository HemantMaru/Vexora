import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="border border-[var(--border-color)] p-10 max-w-md w-full text-center bg-[var(--bg-secondary)]/10 backdrop-blur-sm">
        {/* ✅ ICON */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500">
          <span className="text-green-500 text-2xl">✓</span>
        </div>

        {/* ✅ TITLE */}
        <h1 className="text-xl font-bold uppercase tracking-widest mb-2">
          Payment Successful
        </h1>

        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Your order has been placed successfully.
        </p>

        {/* ✅ BUTTONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/orders-history")}
            className="w-full py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:opacity-90"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="w-full py-3 border border-[var(--border-color)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--bg-secondary)]/20"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
