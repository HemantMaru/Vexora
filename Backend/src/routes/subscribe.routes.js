import { Router } from "express";
import { subscribe } from "../controllers/subscribe.controller.js";
import { authenticateUser } from "../middleware/auth.middlware.js";
const subscribeRouter = Router();
subscribeRouter.post("/subscribe", subscribe);
export default subscribeRouter;
