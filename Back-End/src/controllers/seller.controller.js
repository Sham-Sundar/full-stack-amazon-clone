import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Seller } from "../models/seller.model.js";
import { generateAccessAndRefreshToken, generateAccessToken } from "../utils/token.js";
import jsonwebtoken from "jsonwebtoken";


const registerSeller = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }

    const existedSeller = await Seller.findOne({ email })

    if (existedSeller) {
        throw new ApiError(401, "Seller already exists ")
    }

    const seller = await Seller.create({
        fullName,
        email,
        password
    })

    const sellerCreated = await Seller.findById(seller._id).select("-password -refreshToken")

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Seller registered successfully!", sellerCreated)
        )
})

const loginSeller = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!(email && password)) {
        throw new ApiError(401, "Email and password is required")
    }

    const sellerFound = await Seller.findOne({ email });
    if (!sellerFound) {
        throw new ApiError(401, "Seller does not exist")
    }

    const isPasswordCorrect = await sellerFound.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(sellerFound._id, "seller")


    if (!(accessToken || refreshToken)) {
        throw new ApiError(500, "Failed to generate tokens");
    }

    const loggedInSeller = await Seller.findById(sellerFound._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 3600*1000,
        sameSite: 'strict'
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "Logged in successfully", { seller: loggedInSeller, accessToken, refreshToken })
        )
})

const logoutSeller = asyncHandler(async (req, res) => {
    await Seller.findByIdAndUpdate(
        req.account._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(201)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(201, "Logout Successful", {})
        )
})

const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (!(oldPassword && newPassword)) {
        throw new ApiError(401, "All fields are required")
    }

    const seller = await Seller.findByIdAndUpdate(
        req.account._id,
        {
            $set: {
                password: newPassword
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")


    return res
        .status(200)
        .json(
            new ApiResponse(200, "Password changed successfully", seller)
        )
})

const getTotalOrders = asyncHandler(async (req, res) => {

})

const updateAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(404, "Unauthorized request")
    }

    const decodedTokenDetail = jsonwebtoken.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    if (!decodedTokenDetail) {
        throw new ApiError(404, "Invalid refresh token")
    }

    const seller = await Seller.findById(decodedTokenDetail?._id)

    if (!seller) {
        throw new ApiError(401, "Invalid token")
    }

    if (incomingRefreshToken !== seller?.refreshToken) {
        throw new ApiError(401, "Invalid token")
    }

    const accessToken = generateAccessToken(seller, 'seller')

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", incomingRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                "Access Token Refreshed Successfully",
                { accessToken, incomingRefreshToken }
            )
        )
})

const deleteSellerAccount = asyncHandler(async (req, res) => {
    try {
        await Seller.findByIdAndDelete(req.account._id)

        return res
            .status(200)
            .json(
                new ApiResponse(200, "Seller account deleted successfully", {})
            )

    } catch (error) {
        throw new ApiError(401, "Unauthorized Request")
    }
})

export { registerSeller, loginSeller, logoutSeller, updatePassword, getTotalOrders, updateAccessToken, deleteSellerAccount }