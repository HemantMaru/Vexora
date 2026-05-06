import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        variantId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    payment: {
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String,
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },

    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered"],
      default: "placed",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
