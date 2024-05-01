import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    items: [
        {
            products: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        return: true
    },
    Status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned", "Refunded"],
        default: "Pending"
    }


}, { timestamps: true })


export const Order = mongoose.model("Order", orderSchema)