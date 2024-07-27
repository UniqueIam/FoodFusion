import express from "express";
import { listOrders, placeOrder, userOrders, verifyOrder } from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);

export default orderRouter;