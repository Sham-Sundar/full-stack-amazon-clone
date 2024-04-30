import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const addProduct = asyncHandler(async (req, res) => {
    const { title, description, price, discountedPrice, category, brand, stock } = req.body

    if ([title, description, price, category, brand, stock].some((field) => field.trim() === "")) {
        new ApiError(401, "All fields are required")
    }

    if (!req.account.type === 'seller') {
        throw new ApiError(401, "Unauthorized request")
    }

    const existedProduct = await Product.findOne({ title })

    if (existedProduct) {
        throw new ApiError(401, "Product already exists")
    }

    const imageLocalPath = req.files?.productImage[0]?.path

    if (!imageLocalPath) {
        throw new ApiError(401, "Image file is required")
    }

    const productImage = await uploadOnCloudinary(imageLocalPath)

    if (!productImage) {
        throw new ApiError(401, "Product image is required")
    }

    const product = await Product.create({
        title, description, price, discountedPrice, category, brand, image: productImage.url, stock
    })

    const productAdded = await Product.findById(product._id)

    if (!productAdded) {
        throw new ApiError(401, "Something went wrong while adding product")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Product added successfully", productAdded)
    )
})

export { addProduct }