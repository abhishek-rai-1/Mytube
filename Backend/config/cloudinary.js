import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const uploadOnCloudinary = async(filePath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });

    try {
        if(!filePath)   return null;
        const result = await cloudinary.uploader.upload(filePath, {resource_type : 'auto'});
        return result.secure_url;
    } catch (error) {
        console.log('some error occured while uploading to cloudinay :', error);
    }
    finally{
        if(filePath && fs.existsSync(filePath))    fs.unlinkSync(filePath);
    }
}

export default uploadOnCloudinary;