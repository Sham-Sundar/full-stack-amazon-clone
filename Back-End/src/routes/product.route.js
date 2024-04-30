import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const productRouter = Router()

// Secured Routes
productRouter.route("/add-product").post(
    verifyJWT,
    upload.fields([
        {
            name: "productImage",
            maxCount: 1
        }
    ]),
    addProduct
)

export { productRouter }