import mongoose from "mongoose";

const playListSchema = new mongoose.Schema({
    channel : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'channel',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        default : ""
    },
    videos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Video'
        }
    ],
    saveBy : [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'User'
        }
    ]
}, {timestamps : true});

const Playlist = mongoose.model("Playlist", playListSchema);

export default Playlist;