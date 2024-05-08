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
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
        console.log("File uploaded successfully on Cloudinary", response.url);
        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        // Handle specific error cases
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("Local file deleted");
        }
        return null;
    }
};


export {uploadOnCloudinary}