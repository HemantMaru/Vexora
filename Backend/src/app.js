import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.routes.js";
import cors from "cors";
import morgan from "morgan";
import inquiryRouter from "./routes/inquiry.routes.js";
import subscribeRouter from "./routes/subscribe.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { config } from "./config/config.js";
let app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/product", productRouter);
app.use("/api/", inquiryRouter);
app.use("/api/", subscribeRouter);
app.use("/api/cart", cartRouter);
export default app;
