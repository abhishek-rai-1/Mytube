import User from "../models/userModel.js"
import Channel from "../models/ChannelModel.js"
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        return user ? res.status(200).json(user) : res.status(404).json({message : "User is not found"});
    } catch (error) {
        return res.status(500).json({message : `getCurrentUser error : ${error}`})
    }
}

export const createChannel = async (req, res) => {
    try {
        const {name, description, category} = req.body;
        const userId = req.userId;

        const existingChannel = await Channel.findOne({owner : userId});
        if(existingChannel) return res.status(400).json({message : "User already have a channel"});

        const nameExist = await Channel.findOne({name})
        if(nameExist)   return res.status(400).json({message : "Channel name should be unique"});

        let avatar, banner;
        if(req.files?.avatar)   avatar = await uploadOnCloudinary(req.file.avatar[0].path);
        if(req.files?.banner)   banner = await uploadOnCloudinary(req.file.banner[0].path);

        const channel = await Channel.create({name, description, category, avatar, banner, owner: userId});
        await User.findByIdAndUpdate(userId, {channel : channel._id, userName : name, photoUrl : avatar});

        return res.status(200).json({message : "channel created successfully", channel})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "some error occured while creating the channel"});
    }
}