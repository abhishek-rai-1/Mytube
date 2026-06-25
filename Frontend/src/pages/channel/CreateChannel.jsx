import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import logo from "/Mytube.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { backendURL } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { setChannelData } from '../../redux/userSlice';

export const CreateChannel = () => {
  const {userData} = useSelector(state => state.user);
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  }

  const handleBanner = (e) => {
    setBanner(e.target.files[0]);
  }

  const nextStep = () => setStep(prev => prev+1)
  const prevStep = () => setStep(prev => prev-1)

  const handleCreateChannel = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("banner", banner);
    formData.append("name", channelName);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const response = await axios.post(`${backendURL}/api/user/createChannel`, formData, {withCredentials : true});
      toast.success(response.data.message, {pauseOnHover: false});
      dispatch(setChannelData(response.data.channel));
      navigate('/viewChannel');
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
      console.log(`create channel error : ${error}`);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#0f0f0f] flex flex-col'>
      <header className='flex justify-between items-center px-6 py-3 border-b border-gray-700'>
        <div className='flex items-center gapa-2 cursor-pointer' onClick={() => navigate('/')}>
          <img src={logo} alt="myTube logo" className='w-8 h-8 object-cover'/>
          <span className='font-bold text-xl tracking-tight'>MyTube</span>
        </div>
        {
          userData?.photoUrl ? 
            <img src={userData?.photoUrl} alt='your profile picture' className='w-9 h-9 rounded-full object-cover cursor-pointer'/>
          :
            <span className='bg-pink-600 text-white px-3 py-1 rounded-full font-bold' onClick={() => setPopup(prev => !prev)}> {userData?.userName?.[0]?.toUpperCase()} </span>
        }
      </header>

      <main className='flex flex-1 justify-center items-center px-4'>
        <div className='bg-[#212121] p-6 rounded-xl w-full max-w-lg shadow-lg'>
          {
            step === 1 && 
            <>
              <h2 className='text-2xl font-semibold mb-4'>How you'll appear</h2>
              <p className='text-sm text-gray-400 mb-6'>Choose your profile picture, Channel name</p>

              <label htmlFor="avatar" className='cursor-pointer flex flex-col items-center mb-6'>
                {
                  avatar ? 
                    <img src={URL.createObjectURL(avatar)} alt="avatar photo" className='w-20 h-20 object-cover border-2 border-gray-400 rounded-2xl'/>
                  : 
                    <FaUserCircle size={40} className='w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400'/>
                }
                <span className='text-orange-400 text-sm mt-2'>Upload Avatar</span>
                <input type="file" className='hidden' id='avatar' accept='image/*' onChange={handleAvatar}/>
              </label>
              
              <input type="text" placeholder='Channel Name' className='w-full p-3 mb-4 rounded-lg bg-[#212121] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400' value={channelName} onChange={(e) => setChannelName(e.target.value)}/>

              <button onClick={nextStep} disabled={!channelName} className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg font-medium disabled:bg-gray-600 py-2 cursor-pointer'>Continue</button>

              <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={() => navigate('/')}>Back to home</span>
            </>
          }

          {
            step === 2 && 
            <>
              <h2 className='text-2xl font-semibold mb-4'>Your Channel</h2>

              <div className='flex flex-col items-center mb-6'>

                <label className='cursor-pointer flex flex-col items-center'>
                  {
                    avatar ? 
                      <img src={URL.createObjectURL(avatar)} alt="avatar photo" className='w-20 h-20 object-cover border-2 border-gray-400 rounded-2xl'/>
                    : 
                      <FaUserCircle size={40} className='w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-gray-400'/>
                  }

                </label>

                <h2 className='mt-3 text-lg font-semibold'>{channelName}</h2>
              </div>

              <button onClick={nextStep} disabled={!channelName} className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg font-medium disabled:bg-gray-600 py-2 cursor-pointer'>Continue and create channel</button>

              <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={prevStep}>Back</span>
            </>
          }

          {
            step === 3 && 
            <>
              <h2 className='text-2xl font-semibold mb-4'>Create Channel</h2>

              <label htmlFor="banner" className='w-full cursor-pointer block mb-6'>
                {
                  banner ? 
                    <img src={URL.createObjectURL(banner)} alt="banner photo" className='w-full h-32 object-cover rounded-lg mb-2 border border-gray-700'/>
                  :
                    <div className='w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 mb-2'>
                      Click to uplaod banner image
                    </div>
                }
                <span className='text-orange-400 text-sm mt-2'>Banner Image</span>
                <input type="file" className='hidden' id='banner' accept='image/*' onChange={handleBanner}/>
              </label>

              <textarea placeholder='Channel Description' className='w-full p-3 mb-4 rounded-lg bg-[#212121] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              
              <input type="text" placeholder='Channel Category' className='w-full p-3 mb-6 rounded-lg bg-[#212121] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400' value={category} onChange={(e) => setCategory(e.target.value)}/>

              <button onClick={handleCreateChannel} disabled={!description || !category || loading} className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg font-medium disabled:bg-gray-600 py-2 cursor-pointer'>{loading ? <ClipLoader size={20} color='white'/> :"Save and Create Channel"}</button>

              <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={prevStep}>Back</span>
            </>
          }
        </div>
      </main>
    </div>
  )
}
