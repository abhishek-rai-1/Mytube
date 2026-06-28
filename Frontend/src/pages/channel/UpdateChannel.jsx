import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { backendURL } from '../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { setChannelData } from '../../redux/userSlice';
import { uploadToCloudinary } from '../../../utils/UploadToCloudinary';
import { getCloudinarySignature } from '../../customHooks/GetCloudinarySignature';

export const UpdateChannel = () => {
  const {channelData} = useSelector(state => state.user);
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const [channelName, setChannelName] = useState(channelData?.name);
  const [description, setDescription] = useState(channelData?.description);
  const [category, setCategory] = useState(channelData?.category);
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

  const allowed = ["image/png", "image/jpeg", "image/webp"];

  const handleUpdateChannel = async () => {
    if((avatar && !allowed.includes(avatar?.type)) || (banner && !allowed.includes(banner?.type))) {
      toast.error("Only PNG, JPG and WEBP are allowed.");
      return;
    }

    if((avatar && avatar?.size > 5 * 1024 * 1024) || (banner && banner?.size > 5 * 1024 * 1024)) {
      toast.error("Avatar and Banner must be less than 5 MB");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${backendURL}/api/user/validateUpdateChannel`, {name : channelName}, {withCredentials : true});

      const sign = await getCloudinarySignature();

      const [avatarUrl, bannerUrl] = await Promise.all([
        avatar ? uploadToCloudinary(avatar, sign) : Promise.resolve(channelData?.avatar),
        banner ? uploadToCloudinary(banner, sign) : Promise.resolve(channelData?.banner)
      ]);

      const response = await axios.post(`${backendURL}/api/user/updateChannel`, {avatar : avatarUrl.secure_url, banner : bannerUrl.secure_url, name : channelName, description, category}, {withCredentials : true});

      toast.success(response.data.message, {pauseOnHover: false});

      dispatch(setChannelData(response.data.updatedChannel));

      navigate('/viewChannel');
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
      console.log(`update channel error : ${error}`);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-screen bg-[#0f0f0f] flex flex-col'>

      <main className='flex flex-1 justify-center items-center px-4'>
        <div className='bg-[#212121] p-6 rounded-xl w-full max-w-lg shadow-lg'>
          {
            step === 1 && 
            <>
              <h2 className='text-2xl font-semibold mb-4'>Update channel</h2>
              <p className='text-sm text-gray-400 mb-6'>Choose your profile picture, Channel name</p>

              <label htmlFor="avatar" className='cursor-pointer flex flex-col items-center mb-6'>                
                <img src={avatar ? URL.createObjectURL(avatar) : channelData?.avatar} alt="avatar photo" className='w-20 h-20 object-cover border-2 border-gray-400 rounded-2xl'/>
                
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
              <h2 className='text-2xl font-semibold mb-4'>Your updated channel</h2>

              <div className='flex flex-col items-center mb-6'>

                <label className='cursor-pointer flex flex-col items-center'>
                  {
                    <img src={avatar ? URL.createObjectURL(avatar) : channelData?.avatar} alt="avatar photo" className='w-20 h-20 object-cover border-2 border-gray-400 rounded-2xl'/>
                  }
                </label>

                <h2 className='mt-3 text-lg font-semibold'>{channelName}</h2>
              </div>

              <button onClick={nextStep} disabled={!channelName} className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg font-medium disabled:bg-gray-600 py-2 cursor-pointer'>Continue and update channel</button>

              <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={prevStep}>Back</span>
            </>
          }

          {
            step === 3 && 
            <>
              <h2 className='text-2xl font-semibold mb-4'>Update Channel</h2>

              <label htmlFor="banner" className='w-full cursor-pointer block mb-6'>
                {
                  <img src={banner ? URL.createObjectURL(banner) : channelData?.banner} alt="banner photo" className='w-full h-32 object-cover rounded-lg mb-2 border border-gray-700'/>
                }

                <span className='text-orange-400 text-sm mt-2'>Banner Image</span>
                <input type="file" className='hidden' id='banner' accept='image/*' onChange={handleBanner}/>
              </label>

              <textarea placeholder='Channel Description' className='w-full p-3 mb-4 rounded-lg bg-[#212121] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              
              <input type="text" placeholder='Channel Category' className='w-full p-3 mb-6 rounded-lg bg-[#212121] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400' value={category} onChange={(e) => setCategory(e.target.value)}/>

              <button onClick={handleUpdateChannel} disabled={!description || !category || loading} className='w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 transition rounded-lg font-medium disabled:bg-gray-600 py-2 cursor-pointer'>{loading ? <ClipLoader size={20} color='white'/> :"Save and update Channel"}</button>

              <span className='w-full flex items-center justify-center text-sm text-blue-400 cursor-pointer hover:underline mt-2' onClick={prevStep}>Back</span>
            </>
          }
        </div>
      </main>
    </div>
  )
}
