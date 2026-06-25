import uploadOnCloudinary from "../config/cloudinary.js";
import Video from "../models/videoModel.js";

export const createVideo = async (req, res) => {
    try {
        const {title, description, tags, channelId} = req.body;

        if(!title || !description || !channelId)    return res.status(400).json({message : "title, description, channelId is required"});

        const channel = await Channel.findById({channelId});
        if(!channel)    return res.status(400).json({message : "Channel is not found"});

        if(!req.files?.video || !req.files?.thumbnail)  return res.status(400).json({message : "video and thumbnail are requied"});

        const uploadVideo = await uploadOnCloudinary(req.files?.video[0].path)

        const uploadThumbnail = await uploadOnCloudinary(req.files?.thumbnail[0].path)

        let parsedTag = [];
        if(tag){
            try {
                parsedTag = JSON.parse(tags);
            } catch (error) {
                parsedTag = [];
            }
        }

        const videoData = await Video.create({channel : channel._id, title, description, videoUrl : uploadVideo, thumbnail : uploadThumbnail, tags : parsedTag});

        await Channel.findByIdAndUpdate(channel._id, {$push : {videos : videoData._id}}, {new : true});

        return res.status(201).json(videoData);
    } catch (error) {
        return res.status(500).json({message : `failed to create video ${error}`})
    }
}