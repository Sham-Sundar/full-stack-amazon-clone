import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";


dotenv.config({
    path: './env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("Server is running at port: ", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log("DB Connection Failed (index.js): ", err);
    })