import { config } from "./config.js";
import mongoose from "mongoose";
export async function MongooseConnect() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connect to db successfully");
}
