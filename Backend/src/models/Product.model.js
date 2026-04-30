import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },

    category: {
      type: String,
      required: true,
      enum: ["shirts", "tshirts", "jeans", "hoodies"],
      index: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    variants: [
      {
        size: {
          type: String,
          enum: ["S", "M", "L", "XL", "XXL"],
          required: [true, "Size is required"],
        },

        price: {
          amount: {
            type: Number,
            required: [true, " priceAmount is required"],
          },
          currency: {
            type: String,
            required: [true, "priceCurrency is required"],
          },
          discount: {
            type: Number,
            required: [true, "Discount is required"],
          },
          mrp: {
            type: Number,
            required: [true, "MRP is required"],
          },
        },

        color: {
          type: String,
          required: [true, "priceCurrency is required"],
        },

        stock: {
          type: Number,
          required: [true, "stock is required"],
          default: 0,
        },

        image: {
          type: [String],
          required: [true, "image is required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
productSchema.index({ category: 1, createdAt: -1 });
const productModel = mongoose.model("product", productSchema);
export default productModel;
