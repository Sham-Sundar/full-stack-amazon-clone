import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jsonwebtoken from "jsonwebtoken";
import { Seller } from "../models/seller.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (token === "") {
            throw new ApiError(401, "Token is Empty");
        }

        const decodedTokenData = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET);

        let account;
        if (decodedTokenData.type === "user") {
            account = await User.findById(decodedTokenData._id).select("-password -refreshToken");
        } else if (decodedTokenData.type === "seller") {
            account = await Seller.findById(decodedTokenData._id).select("-password -refreshToken");
        } else {
            throw new ApiError(401, "Invalid user type");
        }

        if (!account) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.account = account;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});
