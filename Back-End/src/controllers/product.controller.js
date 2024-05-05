import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Seller } from "../models/seller.model.js";
import fs from "fs";

const addProduct = asyncHandler(async (req, res) => {
    const { title, description, price, discountedPrice, category, brand, stock } = req.body;
    const numericPrice = parseFloat(price);
    const numericDiscountedPrice = parseFloat(discountedPrice);
    const numericStock = parseInt(stock);

    if ((title && description && price && category && brand && stock) === "") {
        throw new ApiError(401, "All fields are required");
    }

    if ((req.account.type) === "user") {
        throw new ApiError(401, "Unauthorized Request, you are not seller");
    }

    const existedProduct = await Product.findOne({ title });

    if (existedProduct) {
        throw new ApiError(401, "Product already exists");
    }

    const imageLocalPath = req.files?.productImage[0]?.path;

    if (!(imageLocalPath)) {
        throw new ApiError(401, "Image file is required");
    }

    const productImage = await uploadOnCloudinary(imageLocalPath);

    if (!(productImage)) {
        throw new ApiError(401, "Product image is required");
    }

    const product = await Product.create({
        title,
        description,
        price: numericPrice,
        discountedPrice: numericDiscountedPrice,
        category,
        brand,
        image: productImage.url,
        stock: numericStock,
        seller: req.account._id,
    });

    await Seller.findByIdAndUpdate(req.account._id, {
        $push: { products: product._id },
    });

    const productAdded = await Product.findById(product._id);

    if (!productAdded) {
        throw new ApiError(401, "Something went wrong while adding product");
    }

    fs.unlinkSync(imageLocalPath);

    return res.status(200).json(new ApiResponse(200, "Product added successfully", productAdded));
});

const updateProduct = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        discountedPrice,
        category,
        brand,
        stock
    } = req.body;
    const { id } = req.params;

    if (!(title && description && price && category && brand && stock)) {
        throw new ApiError(401, "All fields are required");
    }

    if ((req.account.type) === 'user') {
        throw new ApiError(401, "Unauthorized request, you are not seller");
    }

    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(401, "Product not found");
    }


    if (req.files) {
        const imageLocalPath = req.files?.productImage[0]?.path;
        if (!imageLocalPath) {
            throw new ApiError(401, "Image file is required");
        }

        const productImage = await uploadOnCloudinary(imageLocalPath);
        if (!productImage) {
            throw new ApiError(401, "Product image is required");
        }

        product.image = productImage.url;
    }

    product.title = title;
    product.description = description;
    product.price = price;
    product.discountedPrice = discountedPrice;
    product.category = category;
    product.brand = brand;
    product.stock = stock;

    await product.save();

    const productUpdated = await Product.findById(product._id);
    if (!productUpdated) {
        throw new ApiError(401, "Something went wrong while updating product");
    }

    return res.status(200).json(
        new ApiResponse(200, "Product updated successfully", productUpdated)
    );
});

const deleteProduct = asyncHandler(async (req, res) => {

    if ((req.account.type) === "user") {
        throw new ApiError(401, "Unauthorized request");
    }

    const { id } = req.params;
    console.log(req.params);

    if (!(id)) {
        throw new ApiError(400, "Invalid Product Id");
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!(deletedProduct)) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(new ApiResponse(200, "Product Deleted Successfully", {}));
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Products Fetched Successfully", products)
        )
})

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        throw new ApiError(401, "Product id is required")
    }

    const product = await Product.findById(id)

    if (!product) {
        throw new ApiError(401, "Product not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Product Fetched Successfully", product)
        )
})

export { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };