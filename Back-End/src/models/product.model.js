import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 1050
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min: 0
    },
    discountedPrice: {
        type: Number,
        trim: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ["Clothing, Shoes & Jewelry", "Grocery & Gourmet Food", "Sports & Outdoors", "Pet Supplies", "Tools & Home Improvement"]
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "Seller"
    },
    brand: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30,
        trim: true,
        index: true
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
        default: 0
    },
    image: {
        type: String, // Cloudinary Url
        required: true
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: "Review"
    },
    averageRating: {
        type: Number
    }


}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)