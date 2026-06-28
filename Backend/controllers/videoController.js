import uploadOnCloudinary from "../config/cloudinary.js";
import Channel from "../models/ChannelModel.js";
import Video from "../models/videoModel.js";

export const createVideo = async (req, res) => {
    try {
        const {title, description, tags, channelId, thumbnailUrl, videoUrl} = req.body;

        if(!title || !description || !channelId)    return res.status(400).json({message : "title, description, channelId is required"});

        const channel = await Channel.findById(channelId);
        if(!channel)    return res.status(400).json({message : "Channel is not found"});

        if(!thumbnailUrl || !videoUrl)  return res.status(400).json({message : 'video and thumbnail is required'});

        let parsedTag = [];
        if(tags){
            try {
                parsedTag = JSON.parse(tags);
            } catch (error) {
                parsedTag = [];
            }
        }

        const videoData = await Video.create({channel : channel._id, title, description, videoUrl, thumbnail : thumbnailUrl, tags : parsedTag});

        await Channel.findByIdAndUpdate(channel._id, {$push : {videos : videoData._id}}, {new : true});

        return res.status(201).json({message : "video uploaded successfully", videoData});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "failed to create video"})
    }
}

export const getVideos = async(req, res) => {
    try {
        const videos = await Video.find().sort({createdAt : -1})
        if(!videos) return res.status(400).json({message : "videos are not present"});

        return res.status(200).json(videos);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "failed to get videos"});
    }
}