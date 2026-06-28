import cloudinary from "../config/cloudinary.js";

export const getSignature = async (req, res) => {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request( {timestamp, folder: "myTube"}, process.env.CLOUDINARY_SECRET_KEY);

    res.json({ timestamp, signature, folder: "myTube", cloudName: process.env.CLOUDINARY_NAME, apiKey: process.env.CLOUDINARY_API_KEY });
};