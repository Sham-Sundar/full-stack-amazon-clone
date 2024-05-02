import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshToken, generateAccessToken } from "../utils/token.js";
import jsonwebtoken from "jsonwebtoken";


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
        throw new ApiError(401, "User does not exist")
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

    if (!(oldPassword && newPassword)) {
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

// const updateAccessToken = asyncHandler(async (req, res) => {
//     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

//     if (!incomingRefreshToken) {
//         throw new ApiError(404, "Unauthorized request")
//     }

//     const decodedTokenDetail = jsonwebtoken.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

//     if (!decodedTokenDetail) {
//         throw new ApiError(404, "Invalid refresh token")
//     }

//     const user = await User.findById(decodedTokenDetail?._id)

//     if (!user) {
//         throw new ApiError(401, "Invalid token")
//     }

//     if (incomingRefreshToken !== user?.refreshToken) {
//         throw new ApiError(401, "Invalid token")
//     }

//     const accessToken = generateAccessToken(user, 'user')

//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res
//         .status(200)
//         .cookie("accessToken", accessToken, options)
//         .cookie("refreshToken", incomingRefreshToken, options)
//         .json(
//             new ApiResponse(
//                 200,
//                 "Access Token Refreshed Successfully",
//                 { accessToken, incomingRefreshToken }
//             )
//         )
// })

const deleteUserAccount = asyncHandler(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.account._id)
        
        return res
        .status(200)
        .json(
            new ApiResponse(200, "User account deleted successfully", {})
        )

    } catch (error) {
        throw new ApiError(401, "Unauthorized Request")
    }
})

export { registerUser, loginUser, logoutUser, updateAddress, updatePassword, getUserOrders, updateAccessToken, deleteUserAccount}