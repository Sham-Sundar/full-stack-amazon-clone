import { Router } from "express";
import { addProduct, deleteProduct, updateProduct, getAllProducts, getProductById } from "../controllers/product.controller.js";
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

productRouter.route("/update-product/:id").patch(
    verifyJWT,
    upload.fields([
        {
            name: "productImage",
            maxCount: 1
        }
    ]),
    updateProduct
)
productRouter.route("/delete-product/:id").delete(verifyJWT, deleteProduct)
productRouter.route("/get-products").get(getAllProducts)
productRouter.route("/get-product/:id").get(getProductById)



export { productRouter }