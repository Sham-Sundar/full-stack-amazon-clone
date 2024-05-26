import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = asyncHandler(async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const createOrder = asyncHandler(async (req, res) => {
    try {
        const { items, totalPrice } = req.body;

        const order = new Order({
            user: req.account._id,
            items: items.map(item => ({
                products: item._id,
                quantity: item.quantity,
            })),
            totalPrice,
        });

        await order.save();
        return res.status(200).json(new ApiResponse(200, "Order created successfully", order));

    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating order");
    }

});

const getUserOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({ user: req.account._id }).populate('items.products');
        return res.status(200).json(new ApiResponse(200, "Order fetched successfully", orders));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching orders");
    }
});

export { createPaymentIntent, createOrder, getUserOrders };