import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user', 
    initialState : {
        userData : null,
        channelData : null,
    },
    reducers : {
        setUserData : (state, actions) => {
            state.userData = actions.payload
        },
        setChannelData : (state, actions) => {
            state.channelData = actions.payload
        }
    }
})

export const {setUserData, setChannelData} = userSlice.actions;
export default userSlice.reducer;