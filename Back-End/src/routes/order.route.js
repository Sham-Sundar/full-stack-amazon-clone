import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controller";


const orderRouter = Router()

// Secured Routes
orderRouter.route("/create-order").post(verifyJWT, createOrder)

export { orderRouter }


