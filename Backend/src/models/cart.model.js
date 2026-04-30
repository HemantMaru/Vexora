import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
        },
        size: String,
        color: String,
        image: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
