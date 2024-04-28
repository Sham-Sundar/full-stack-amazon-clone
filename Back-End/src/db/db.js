import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const dbConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\nMongoDb Connection Successful At Host (db.js): ${dbConnectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Failed (db.js): ", error);
        // this process.exit(1) is used to exit from the 
        process.exit(1)
    }
}

export default connectDB