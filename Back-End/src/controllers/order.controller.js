import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";

const createOrder = asyncHandler(async(req, res)=>{
    const {totalPrice, } = req.body
})

export {createOrder}