import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name : 'video', 
    initialState : {
        videoData : null,
        shortData : null,
    },
    reducers : {
        setVideoData : (state, actions) => {
            state.videoData = actions.payload
        },
        setShortData : (state, actions) => {
            state.shortData = actions.payload
        }
    }
})

export const {setVideoData, setShortData} = videoSlice.actions;
export default videoSlice.reducer;