import mongoose from "mongoose";
const subscribeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
  },
  {
    timestamps: true,
  },
);

const subscribeModel = mongoose.model("subscribe", subscribeSchema);
export default subscribeModel;
