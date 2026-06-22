import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        unique : true,
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },
    photoUrl : {
        type : String,
        default : ""
    },
    channel : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Channel'
    },
    resetOpt : {
        type : String
    },
    otpExpires : {
        type : Date
    },
    isOtpVerified : {
        type : Boolean,
        default : false
    }
}, {timestamps : true});

const User = mongoose.model('User', userSchema);

export default User;