import axios from "axios";
import { backendURL } from "../src/App";

export const uploadToCloudinary = async (file, sign, resourceType = "image") => {
    try {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("api_key", sign.apiKey);
        formData.append("timestamp", sign.timestamp);
        formData.append("signature", sign.signature);
        formData.append("folder", sign.folder);

        console.log("uploading");

        const upload = await axios.post( `https://api.cloudinary.com/v1_1/${sign.cloudName}/${resourceType}/upload`, formData );

        return upload.data;

    } catch (error) {
        console.log(resourceType, error.response?.data || error);
        throw error;
    }
};