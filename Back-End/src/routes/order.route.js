import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";


const orderRouter = Router()

// Secured Routes
orderRouter.route("/create-order").post(verifyJWT, createOrder)

export { orderRouter }


