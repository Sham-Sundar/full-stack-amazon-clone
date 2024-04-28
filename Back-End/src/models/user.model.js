import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    address: [{
        street: String,
        city: String,
        state: String,
        postalCode: String,
    }],
    order: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    refreshToken: {
        type: String //from bcrypt
    }

}, { timestamps: true })

// Here we are converting password into hash using bcrypt
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// We are creating this method to compare password which we can use anywhere
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// For generating access token
userSchema.methods.generateAccessToken = async function () {
    jsonwebtoken.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// For generating refresh token
userSchema.methods.generateRefreshToken = async function () {
    jsonwebtoken.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)