import Channel from "../models/ChannelModel.js";

export const validateVideoChannel = async (req, res) => {
    const {channelId} = req.body;
    try {
        const channel = await Channel.findById(channelId);
        if(!channel)    return res.status(400).json({message : "Channel is not found"});
        return res.status(200).json({message : "validation successfull"});
    } catch (error) {
        return res.status(500).json({message : "failed to validate channle for video"})
    }
}