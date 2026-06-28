import Channel from "../models/ChannelModel.js";

export const validateCreateChannel = async(req, res) => {
    try {
        const {name} = req.body;

        if(!name)  return res.status(400).json({message : "channel name is required"});

        const userId = req.userId;

        const existingChannel = await Channel.findOne({owner : userId});
        if(existingChannel) return res.status(400).json({message : "User already have a channel"});

        const nameExist = await Channel.findOne({name})
        if(nameExist)   return res.status(400).json({message : "Channel name should be unique"});

        return res.status(200).json({message : 'validation completed'});

    } catch (error) {
        return res.status(500).json({message : `validate create channel error : ${error.message}`})
    }
}