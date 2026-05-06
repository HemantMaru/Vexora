import Razorpay from "razorpay";
import { config } from "../config/config.js";

export const razorInstance = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});
