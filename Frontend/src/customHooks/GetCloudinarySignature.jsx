import axios from "axios";
import { backendURL } from "../App";

export const getCloudinarySignature = async () => {
    const { data } = await axios.get(`${backendURL}/api/getCloudinarySignature/signature`,{ withCredentials: true });
    return data;
};
