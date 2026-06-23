import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { BsFillPersonFill } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { TiUserAdd } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';

export const Profile = () => {
    const {userData} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignout = async() => {
        try {
            const result = await axios.get(`${backendURL}/api/auth/signout`, {withCredentials : true});
            dispatch(setUserData(null));
            toast.success(result?.data?.message, {pauseOnHover: false});
        } catch (error) {
            toast.error( error.response?.data?.message || "Something went wrong", {pauseOnHover: false});
            console.log(`some error occured while signout : ${error.message}`);
        }
    }

    const handleGoogleAuth = async() => {
        try {
            const response = await signInWithPopup(auth, provider);
            let {displayName : userName, email, photoURL : photoUrl} = response.user;

            const data = {userName, email, photoUrl};

            const result = await axios.post(`${backendURL}/api/auth/googleauth`, data, {withCredentials : true});

            dispatch(setUserData(result?.data.user));
            toast.success(result?.data?.message, {pauseOnHover: false});
        } catch (error) {
            toast.error( error.response?.data?.message || "Something went wrong", {pauseOnHover: false});
            console.log(`some error occured while google signUp : ${error.message}`);
        }
    }

    return (
        <div className='absolute right-5 top-12 mt-2 w-72 bg-[#212121] rounded-xl shadow-lg z-50 hidden md:block'>
            {
                userData && 
                    <div className='flex items-center gap-3 p-4 border-b border-gray-700'>
                    {
                        userData?.photoUrl ? 
                            <img src={userData?.photoUrl} className='w-12 h-12 rounded-full object-cover border border-gray-700'/> 
                        : 
                            userData?.userName ? 
                                <span className='bg-pink-600 text-white px-3 py-1 rounded-full font-bold cursor-pointer'>{userData?.userName?.[0]?.toUpperCase()}</span> 
                            : 
                                <BsFillPersonFill className='text-3xl flex text-gray-400 bg-gray-500 rounded-full p-2 cursor-pointer'/>
                    }
                    <div>
                        <h2 className='font-semibold'>{userData?.userName}</h2>
                        <p className='text-sm text-gray-400'>{userData?.email}</p>
                        <p className='text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:underline' onClick={() => navigate(userData?.channel ? '/viewChannel' : '/createChannel')}>{userData?.channel ? 'view channel' : 'create channel'}</p>
                    </div>
                </div>
            }

            <div className='flex flex-col py-2'>
                <button className='flex items-center gap-3 hover:bg-gray-700 px-3 py-1 cursor-pointer text-md' onClick={handleGoogleAuth}> <FaGoogle/> Login with google</button>

                <button className='flex items-center gap-3 hover:bg-gray-700 px-3 py-1 cursor-pointer text-md' onClick = {() => navigate('/SignUp')}> <TiUserAdd/> Create Account</button>

                <button className='flex items-center gap-3 hover:bg-gray-700 px-3 py-1 cursor-pointer text-md' onClick = {() => navigate('/Login')}> <MdOutlineSwitchAccount/> Login with other account</button>

                {userData?.channel && <button className='flex items-center gap-3 hover:bg-gray-700 px-3 py-1 cursor-pointer text-md'> <SiYoutubestudio/> Your Studio </button>}

                {userData && <button className='flex items-center gap-3 hover:bg-gray-700 px-3 py-1 cursor-pointer text-md' onClick = {handleSignout}> <RiLogoutBoxRLine/> Signout</button>}
            </div>
        </div>
    )
}
