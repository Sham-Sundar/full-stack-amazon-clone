import jsonwebtoken from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import { ApiError } from "./ApiError.js";
import { Seller } from '../models/seller.model.js';

export const generateAccessToken = async (account, userType) => {
    return jsonwebtoken.sign(
        {
            _id: account._id,
            email: account.email,
            fullName: account.fullName,
            type: userType
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

const generateRefreshToken = async (account, userType) => {
    return jsonwebtoken.sign(
        {
            _id: account._id,
            type: userType
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const generateAccessAndRefreshToken = async (userId, userType) => {
    try {
        let account;
        if (userType === "user") {
            account = await User.findById(userId);
        } else if (userType === "seller") {
            account = await Seller.findById(userId);
        } else {
            throw new ApiError(400, "Invalid user type");
        }

        if (!account) {
            throw new ApiError(404, "User or Seller not found");
        }

        const accessToken = await generateAccessToken(account, userType);
        const refreshToken = await generateRefreshToken(account, userType);

        account.refreshToken = refreshToken;
        await account.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

