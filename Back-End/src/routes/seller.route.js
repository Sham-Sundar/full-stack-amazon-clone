import { loginSeller, logoutSeller, registerSeller, updatePassword, updateAccessToken, deleteSellerAccount } from "../controllers/seller.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"


const sellerRouter = Router()

sellerRouter.route("/register").post(registerSeller)
sellerRouter.route("/login").post(loginSeller)

// Secured routes
sellerRouter.route("/logout").get(verifyJWT, logoutSeller)
sellerRouter.route("/update-access-token").post(updateAccessToken)
sellerRouter.route("/update-password").patch(verifyJWT, updatePassword)
sellerRouter.route("/delete-account").delete(verifyJWT, deleteSellerAccount)

export { sellerRouter }
