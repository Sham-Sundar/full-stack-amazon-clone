import { loginUser, logoutUser, registerUser, updateAddress, updatePassword} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"


const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)

// Secured routes
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/update-address").patch(verifyJWT, updateAddress)
userRouter.route("/update-password").patch(verifyJWT, updatePassword)

export { userRouter }
