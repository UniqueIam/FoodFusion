import express from "express";
import { placeOrder, verifyOrder } from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);

export default orderRouter;