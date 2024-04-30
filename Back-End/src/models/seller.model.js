import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const sellerSchema = new Schema({
    fullName: {
        type: String,
        required: true,
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
    products: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    refreshToken: {
        type: String //from bcrypt
    }

}, { timestamps: true })

// Here we are converting password into hash using bcrypt
sellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next();

    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
})

// We are creating this method to compare password
sellerSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Seller = mongoose.model("Seller", sellerSchema)