import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice.js"
import videoSlice from "./videoSlice.js"

export const store = configureStore({
    reducer : { 
        user : userSlice,
        video : videoSlice
    }
})