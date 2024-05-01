import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";

const createOrder = asyncHandler(async(req, res)=>{
    const {totalPrice, items} = req.body
})

export {createOrder}