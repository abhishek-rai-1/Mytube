import { useDispatch } from "react-redux";
import { backendURL } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { setShortData, setVideoData } from "../redux/videoSlice";
import { useEffect } from "react";

export const GetVideoData = () => {
    const dispatch = useDispatch();

    const fetchVideo = async () => {
        try {
            const result = await axios.get(`${backendURL}/api/content/getVideos`, {withCredentials : true});
            console.log(result.data);
            dispatch(setVideoData(result.data));
        } catch (error) {
            dispatch(setVideoData(null));
            toast.error(error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
            console.log(`some error occured while fetching videos details : ${error.response}`);
        }
    }

    const fetchShorts = async () => {
        try {
            const result = await axios.get(`${backendURL}/api/content/getShorts`, {withCredentials : true});
            console.log(result.data);
            dispatch(setShortData(result.data));
        } catch (error) {
            dispatch(setShortData(null));
            toast.error(error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
            console.log(`some error occured while fetching shorts details : ${error.response}`);
        }
    }

    useEffect(() => {
        fetchVideo();
        fetchShorts();
    }, [])
}