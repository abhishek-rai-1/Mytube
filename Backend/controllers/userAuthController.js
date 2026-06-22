// import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt, { hash } from "bcryptjs";
import generateToken from "../config/token.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import sendMail from "../config/SendMain.js";

export const SignUp = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        if(!userName || !email || !password)    return res.status(400).json({message : "All fields are required"});

        if(!validator.isEmail(email))   return res.status(400).json({message : "Invalid email"});

        if(password.length < 8) return res.status(400).json({message : "password is weak"});

        const existUser = await User.findOne({
            $or : [
                {email},
                {userName}
            ]
        });
        if(existUser)   return res.status(400).json({message : "User already exist"});

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({userName, email, password : hashPassword});

        let token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly : true,
            secure : false,
            samesite : "Strict",
            maxAge : 7*24*60*60*1000
        })

        const {password : destructuredPassword, ...userWithPassword} = user.toObject();

        return res.status(201).json({message : "user created successfully", user : userWithPassword});
    } catch (error) {
        return res.status(500).json({message : `SignUp error : ${error.message}`});
    }
}

export const SignIn = async (req, res) => {
    try {
        const {identifier, password} = req.body;

        if(!password)   return res.status(400).json({message : "password is required"});
        
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { userName: identifier }
            ]
        });

        if(!user)   return res.status(400).json({message : "user not found"});

        const comparePassword = await bcrypt.compare(password, user.password);
        
        if(!comparePassword)    return res.status(400).json({message : "Invalid email or password"});

        let token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly : true,
            secure : false,
            samesite : "Strict",
            maxAge : 7*24*60*60*1000
        })

        const {password : destructuredPassword, ...userWithPassword} = user.toObject();
        console.log(userWithPassword);

        return res.status(200).json({message : "user login successfully", user : userWithPassword});
    } catch (error) {
        return res.status(500).json({message : `Login error : ${error.message}`});
    }
}

export const SignOut = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({message : "SignOut successfully"});
    } catch (error) {
        return res.status(500).json({message : `SignOut error : ${error.message}`});
    }
}

export const SignUpWithGoogle = async (req, res) => {
    try {
        const {userName, email, photoUrl} = req.body;
        let googlePhoto = photoUrl;

        const user = await User.findOne({email});
        if(!user)   user = await User.create({userName, email, photoUrl : googlePhoto});
        else{
            if(!user.photoUrl && googlePhoto){
                user.photoUrl = googlePhoto;
                await user.save();
            }
        }

        let token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly : true,
            secure : false,
            samesite : "Strict",
            maxAge : 7*24*60*60*1000
        })

        const {password : destructuredPassword, ...userWithPassword} = user.toObject();

        return res.status(200).json({message : "user login successfully", user : userWithPassword});
    } catch (error) {
        return res.status(500).json({message : `Google SignUp error : ${error.message}`});
    }
}

export const sendOtp = async(req, res) => {
    try {
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user)   return res.status(400).json({message : 'user does not exist'});

        const otp = (1000 + Math.floor(Math.random()*999)).toString();

        user.resetOpt = otp;
        user.otpExpires = Date.now() + 5*60*1000;
        await user.save();

        await sendMail(email, otp);
        return res.status(200).json({message : 'otp send successfully'});
    } catch (error) {
        return res.status(500).json({message : `otp send error : ${error.message}`});
    }
}

export const verifyOtp = async(req, res) => {
    try {
        const {email, otp} = req.body;

        const user = await User.findOne({email});
        if(!user || user.otpExpires < Date.now() || user.resetOpt !== otp)   return res.status(400).json({message : 'Invalid Otp'});

        user.resetOpt = undefined;
        user.otpExpires = undefined;
        user.isOtpVerified = true;

        await user.save();
        return res.status(200).json({message : 'otp verified successfully'});
    } catch (error) {
        return res.status(500).json({message : `otp verification error : ${error.message}`});
    }
}

export const resetPassword = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user || !user.isOtpVerified)    return res.status(400).json({message : 'otp verification required'});

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.isOtpVerified = false;

        await user.save();

        return res.status(200).json({message : 'password reset successfully'});
    } catch (error) {
        return res.status(500).json({message : `password reset error : ${error.message}`});
    }
}