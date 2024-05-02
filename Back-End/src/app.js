import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

// Cookie-Parser is used to set and read cookies of user's browser securely
app.use(cookieParser())

app.use(cors({
    origin: 'https://mean-amazon-clone.vercel.app/',
    credentials: true
}))

// Used to limit the size of json file data which we will receive using forms or params
app.use(express.json({
    limit: "16kb"
}))

// This is used to encode the decoded url
app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

// for storing some images on local server for temporary basis
app.use(express.static("public"))

// 
app.get('/', (req, res) => {
    res.send('<h4>Hello from your Backend!</h4?');
});


// Routes import
import { userRouter } from "./routes/user.route.js"; // User
import { sellerRouter } from "./routes/seller.route.js"; // Seller
import { productRouter } from "./routes/product.route.js"; // Product
import { orderRouter } from "./routes/order.route.js"; // Order


// Routes declaration
app.use("/api/v1/user", userRouter) // User
app.use("/api/v1/seller", sellerRouter) // Seller
app.use("/api/v1/product", productRouter) // Product
app.use("/api/v1/order", orderRouter) // Order

export  {app}