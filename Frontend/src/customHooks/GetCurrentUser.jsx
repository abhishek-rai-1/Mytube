import axios from 'axios'
import React, { useEffect } from 'react'
import { backendURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'

export const GetCurrentUser = () => {
    const dispatch = useDispatch();
    const {channelData} = useSelector(state => state.user);

    const fetchUser = async () => {
        try {
            const result = await axios.get(`${backendURL}/api/user/getUser`, {withCredentials : true});
            dispatch(setUserData(result.data));
        } catch (error) {
            dispatch(setUserData(null));
            toast.error(error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
            console.log(`some error occured while fetching user details : ${error.response}`);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])
}
