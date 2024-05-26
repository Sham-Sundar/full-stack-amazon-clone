import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPaymentIntent, createOrder, getUserOrders } from "../controllers/order.controller.js";

const orderRouter = Router();

// Secured Routes
orderRouter.post('/create-payment-intent',verifyJWT, createPaymentIntent);
orderRouter.post('/create-order', verifyJWT, createOrder);
orderRouter.get('/get-orders/:userId', verifyJWT, getUserOrders);

export { orderRouter };
