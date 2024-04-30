import { loginUser, logoutUser, registerUser, updateAddress, updatePassword, updateAccessToken, deleteUserAccount } from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"


const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)

// Secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/update-access-token").post(updateAccessToken)
userRouter.route("/update-address").patch(verifyJWT, updateAddress)
userRouter.route("/update-password").patch(verifyJWT, updatePassword)
userRouter.route("/delete-account").delete(verifyJWT, deleteUserAccount)

export { userRouter }
