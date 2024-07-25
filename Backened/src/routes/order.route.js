import express from "express";
import { placeOrder } from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder",authMiddleware,placeOrder);

export default orderRouter;