import uploadOnCloudinary from "../config/cloudinary.js";
import Channel from "../models/ChannelModel.js";
import Short from "../models/shortModel.js";

export const createShort = async(req, res) => {
    try {
        const {title, description, tags, channelId} = req.body;
        if(!title || !description || !channelId)    return res.status(400).json({message : 'Short title, description, channelId is required'});

        let shortUrl;
        if(req.file)   shortUrl = await uploadOnCloudinary(req.file?.path)

        console.log(shortUrl);

        const channelData = await Channel.findById(channelId);
        if(!channelData)    return res.status(400).json({message : "channel is not found"});

        const newShort = await Short.create({ channel : channelData._id, title, description, shortUrl, tags : tags ? JSON.parse(tags) : [] })

        await Channel.findByIdAndUpdate(channelData._id, {$push : {shorts : newShort._id}}, {new : true});

        return res.status(201).json({message : "short uploaded successfully", newShort})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'unable to upload short'});
    }
}

export const getShorts = async(req, res) => {
    try {
        const shorts = await Short.find().sort({createdAt : -1})
        if(!shorts) return res.status(400).json({message : "shorts are not present"});

        return res.status(200).json(shorts);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "failed to get shorts"});
    }
}