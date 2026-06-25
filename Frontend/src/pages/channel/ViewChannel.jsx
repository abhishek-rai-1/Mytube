import React from 'react'
import {useSelector} from "react-redux";
import create from "/create.png"
import { useNavigate } from 'react-router-dom';

export const ViewChannel = () => {
  const {channelData} = useSelector(state => state.user);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-3'>
      {/* banner */}
      <div className='w-full h-50 bg-gray-700 relative my-5 rounded-lg border border-gray-500'>
        {
          channelData?.banner ? 
            <img src={channelData?.banner} className='w-full h-full object-cover rounded-lg'/> 
          : <div className='w-full h-full bg-linear-to-r from-gray-800 to-gray-900'></div>
        }
      </div>

      <div className='px-10'>

        <div className='flex flex-col items-center'>

          <img src={channelData?.avatar} alt="channel avatar" className='w-28 h-28  rounded-full object-cover mt-2 border-4 border-gray-600'/>

          <h1 className='text-2xl font-bold mt-3'>{channelData?.name}</h1>

          <p className='text-gray-400'>{channelData?.owner?.email}</p>

          <p className='text-sm text-gray-400 mt-1'>More about this channel... <span className='text-orange-500 cursor-pointer'>{channelData?.category}</span></p>

          <div className='flex gap-4 mt-4'>
            <button className='bg-[#272727] px-4 py-2 rounded-full font-medium cursor-pointer hover:text-xl transition-all duration-300' onClick={() => navigate('/updateChannel')}>Customize Channel</button>
            
            <button className='bg-[#272727] px-4 py-2 rounded-full cursor-pointer font-medium hover:text-xl transition-all duration-300'>Manage Videos</button>
          </div>

        </div>

        <div className='flex flex-col items-center mt-10 gap-2'>
          <img src={create} alt="create logo" className='w-20'/>
          <p className='font-medium'>Create Content</p>
          <p className='text-gray-400 text-sm text-center'>Upload and record.</p>
          <button className='bg-gray-500 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-gray-600' onClick={() => navigate('/create')}>+ Create</button>
        </div>
      </div>
    </div>
  )
}
