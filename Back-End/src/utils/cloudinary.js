import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("File path not found (cloudinary.js)");
        } else {
           const cloudinaryResponse = await cloudinary.uploader.upload(localFilePath,
                { resource_type: "auto" });
            console.log("File uploaded successfully on cloudinary", cloudinaryResponse.url);
            return cloudinaryResponse;
        }
    } catch (error) {
        // if we are unable to upload file on cloudinary successfully then this will remove file from local server
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}