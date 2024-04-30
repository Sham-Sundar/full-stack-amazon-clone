import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {generateAccessAndRefreshToken} from "../utils/token.js";


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        throw new ApiError(401, "User already exists ")
    }

    const user = await User.create({
        fullName,
        email,
        password
    })

    const userCreated = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(201)
        .json(
            new ApiResponse(201, "User registered successfully!", userCreated)
        )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!(email && password)) {
        throw new ApiError(401, "Email and password is required")
    }

    const userFound = await User.findOne({ email });
    if (!userFound) {
        throw new ApiError(401, "User doesn't exist")
    }

    const isPasswordCorrect = await userFound.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userFound._id, 'user')

    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Failed to generate tokens");
    }

    const loggedInUser = await User.findById(userFound._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "Logged in successfully", { user: loggedInUser, accessToken, refreshToken })
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
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

const updateAddress = asyncHandler(async (req, res) => {
    const { street, city, state, zipCode } = req.body

    if (!(street && city && state && zipCode)) {
        throw new ApiError(401, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.account._id,
        {
            $set: {
                "address.0.street": street,
                "address.0.city": city,
                "address.0.state": state,
                "address.0.postalCode": zipCode
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, "Address updated successfully", user)
        )
})

const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if ([oldPassword, newPassword].some((field) => field.trim() === "")) {
        throw new ApiError(401, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
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
            new ApiResponse(200, "Password changed successfully", user)
        )
})

const getUserOrders = asyncHandler(async (req, res) => {

})

export { registerUser, loginUser, logoutUser, updateAddress, updatePassword, getUserOrders}