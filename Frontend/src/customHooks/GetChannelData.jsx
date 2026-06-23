import axios from 'axios'
import React, { useEffect } from 'react'
import { backendURL } from '../App'
import { useDispatch } from 'react-redux'
import { setChannelData } from '../redux/userSlice'
import { toast } from 'react-toastify'

export const GetChannelData = () => {
    const dispatch = useDispatch();

    const fetchChannel = async () => {
        try {
            const result = await axios.get(`${backendURL}/api/user/getChannel`, {withCredentials : true});
            console.log('channel', result.data);
            dispatch(setChannelData(result.data));
        } catch (error) {
            dispatch(setChannelData(null));
            toast.error(error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
            console.log(`some error occured while fetching user details : ${error.response}`);
        }
    }

    useEffect(() => {
        fetchChannel();
    }, [])
}