import { Router } from "express";
import { Inquiry } from "../controllers/inquiry.controller.js";
const inquiryRouter = Router();
inquiryRouter.post("/sendMessage", Inquiry);
export default inquiryRouter;
