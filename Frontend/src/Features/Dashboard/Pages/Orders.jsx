import { useEffect } from "react";
import { useCart } from "../../cart/Hook/useCart";

const Orders = () => {
  const { orders, loading, handleFetchOrders } = useCart();

  useEffect(() => {
    handleFetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-6 md:p-10 text-[var(--text-primary)]">
      <h1 className="text-lg font-bold uppercase tracking-widest mb-6">
        My Orders
      </h1>

      {orders.length === 0 && (
        <p className="text-[var(--text-secondary)]">No orders found</p>
      )}

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-[var(--border-color)] p-6 bg-[var(--bg-secondary)]/10"
          >
            {/* 🔹 TOP */}
            <div className="flex justify-between mb-4 text-sm">
              <span className="font-mono">
                ₹{order.totalAmount.toLocaleString()}
              </span>
              <span
                className={`uppercase text-xs ${
                  order.payment.status === "paid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {order.payment.status}
              </span>
            </div>

            {/* 🔹 ITEMS */}
            <div className="flex flex-col gap-3">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-t border-[var(--border-color)] pt-3"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-14 h-14 object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="text-sm font-mono">₹{item.price}</span>
                </div>
              ))}
            </div>

            {/* 🔹 DATE */}
            <p className="text-xs text-[var(--text-secondary)] mt-4">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
