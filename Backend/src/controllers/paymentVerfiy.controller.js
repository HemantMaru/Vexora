import crypto from "crypto";
import Order from "../models/order.model.js";

import cartModel from "../models/cart.model.js";

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    //  update order
    const order = await Order.findOneAndUpdate(
      { "payment.razorpay_order_id": razorpay_order_id },
      {
        "payment.razorpay_payment_id": razorpay_payment_id,
        "payment.razorpay_signature": razorpay_signature,
        "payment.status": "paid",
      },
      { new: true },
    );

    //  CART CLEAR (IMPORTANT)
    await cartModel.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.json({ success: true, order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Verification failed" });
  }
};
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(orders);
};
