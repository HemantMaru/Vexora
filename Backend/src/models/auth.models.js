import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "fullname is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    contact: {
      type: Number,
      unique: true,
      required: [true, "Contact number is required"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      default: "buyer",
      enum: ["seller", "buyer"],
    },
    searchHistory: {
      type: [String],
      default: [],
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const userModel = mongoose.model("user", userSchema);
export default userModel;
