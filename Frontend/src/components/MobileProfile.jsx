import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { FaGoogle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { SiYoutubestudio } from "react-icons/si";
import { TiUserAdd } from "react-icons/ti";
import { MdOutlineHistory, MdOutlinePlaylistPlay, MdOutlineOndemandVideo } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendURL } from '../App';

export const MobileProfile = () => {
    const {userData} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <div className='md:hidden bg-[#0f0f0f] h-full w-full flex flex-col p-2.5 pt-2'>
            {/* top profile section */}
            {
                userData && 
                <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
                    <img src={userData?.photoUrl} alt="profile photo" className='w-16 h-16 rounded-full object-cover'/>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-lg'>{userData?.userName}</span>
                        <span className='text-gray-400 text-sm'>{userData?.email}</span>
                        <p className='text-sm text-blue-500 cursor-pointer hover:underline hover:text-blue-600' onClick={() => navigate(userData?.channel ? '/viewChannel' : '/createChannel')}>{userData?.channel ? 'view channel' : 'create channel'}</p>
                    </div>
                </div>
            }
            {/* auth button */}
            <div className='flex gap-2 border-b p-4 border-gray-500 overflow-auto scrollbar-none'>
                <button className='bg-gray-800 cursor-pointer text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2' onClick={handleGoogleAuth}><FaGoogle/>SignIn with google account</button>

                <button className='bg-gray-800 cursor-pointer text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2' onClick = {() => navigate('/SignUp')}><TiUserAdd/>Create new account</button>

                <button className='bg-gray-800 cursor-pointer text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2' onClick = {() => navigate('/Login')}><MdOutlineSwitchAccount/>Login with other account</button>

                {userData && <button className='bg-gray-800 cursor-pointer text-nowrap px-3 py-1 rounded-2xl text-sm flex items-center justify-center gap-2' onClick={handleSignout}><RiLogoutBoxRLine/>SignOut</button>}
            </div>

            <div className='flex flex-col mt-5'>
                <ProfileMenuItem icon={<MdOutlineHistory/>} text={"History"}/>
                <ProfileMenuItem icon={<MdOutlinePlaylistPlay/>} text={"Playlist"}/>
                <ProfileMenuItem icon={<MdOutlineOndemandVideo/>} text={"Save Videos"}/>
                <ProfileMenuItem icon={<AiOutlineLike/>} text={"Liked Videos"}/>
                <ProfileMenuItem icon={<SiYoutubestudio/>} text={"MyTube Studio"}/>
            </div>
        </div>
    )
}

const ProfileMenuItem = ({icon, text, onClick}) => {
    return (
        <button onClick={onClick} className='flex items-center gap-3 p-4 hover:bg-[#272727] rounded-2xl w-full cursor-pointer'>
            <span className='text-lg'>{icon}</span>
            <span className='text-sm'>{text}</span>
        </button>
    )
}