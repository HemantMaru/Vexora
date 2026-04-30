import mongoose from "mongoose";
const inquirySchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "fullname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    orderNumber: {
      type: String,
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
  },
  {
    timestamps: true,
  },
);

const inquiryModel = mongoose.model("message", inquirySchema);
export default inquiryModel;
