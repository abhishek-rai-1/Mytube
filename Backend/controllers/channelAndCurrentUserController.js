import User from "../models/userModel.js"
import Channel from "../models/ChannelModel.js"
import uploadOnCloudinary from "../config/cloudinary.js";
import { validateCreateChannel } from "./validateCreateChannel.js";

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
        const {name, description, category, avatar, banner} = req.body;
        const userId = req.userId;

        if(!name)  return res.status(400).json({message : "channel name is required"});
        if(!avatar || !banner)  return res.status(400).json({message : "avatar and banner url is required"});

        const existingChannel = await Channel.findOne({owner : userId});
        if(existingChannel) return res.status(400).json({message : "User already have a channel"});

        const nameExist = await Channel.findOne({name})
        if(nameExist)   return res.status(400).json({message : "Channel name should be unique"});

        const channel = await Channel.create({name, description, category, avatar, banner, owner: userId});
        await User.findByIdAndUpdate(userId, {channel : channel._id, userName : name, photoUrl : avatar});

        return res.status(200).json({message : "channel created successfully", channel})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "some error occured while creating the channel"});
    }
}

export const getChannel = async(req, res) => {
    try {
        const userId = req.userId;

        const channel = await Channel.findOne({owner : userId}).populate("owner", "-password");
        if(!channel)    return res.status(400).json({message : "channel is not found"});

        return res.status(200).json(channel);
    } catch (error) {
        return res.status(500).json({message : `failed to get channel : ${error}`});
    }
}

export const updateChannel = async(req, res) => {
    try {
        const {name, description, category, avatar, banner} = req.body;

        const userId = req.userId;

        const channel = await Channel.findOne({owner : userId}).populate("owner", "-password");
        if(!channel) return res.status(400).json({message : "channel does not exist"});

        if(name && name !== channel.name){
            const nameExist = await Channel.findOne({name})
            if(nameExist)   return res.status(400).json({message : "Channel is already taken"});
            channel.name = name;
        }

        if(!avatar || !banner)  return res.status(400).json({message : "avatar and banner url is required"});
        
        if(description !== undefined)   channel.description = description;
        if(category !== undefined)  channel.category = category;

        channel.avatar = avatar;
        channel.banner = banner;
        
        const updatedChannel = await channel.save();

        await User.findByIdAndUpdate(userId, {userName : name || undefined, photoUrl : channel.avatar || undefined}, {new : true});

        return res.status(200).json({message : "channel updated successfully", updatedChannel})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "some error occured while creating the channel"});
    }
}