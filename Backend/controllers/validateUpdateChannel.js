import Channel from "../models/ChannelModel.js";

export const validateUpdateChannel = async(req, res) => {
    try {
        const {name} = req.body;
        if(!name)   return res.status(400).json({message : "channel name is required"});

        const userId = req.userId;
        
        const channel = await Channel.findOne({owner : userId});
        if(!channel) return res.status(400).json({message : "channel does not exist"});

        if(name && name !== channel.name){
            const nameExist = await Channel.findOne({name})
            if(nameExist)   return res.status(400).json({message : "Channel is already taken"});
        }

        return res.status(200).json({messag : 'validation completed'});
    } catch (error) {
        return res.status(500).json({message : `validate update channel error : ${error.message}`})
    }
}