import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import Mytube from "/Mytube.png";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Header = ({Sidebaropen, setSidebaropen, setPopup}) => {
    const {userData} = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <header className='fixed left-0 top-0 z-50 border-b border-gray-600 h-16 p-4 w-full bg-gray-900'>
            <div className='flex items-center justify-between w-full'>

                {/* left */}
                <div className='flex items-center gap-4'>
                    <button className='bg-[#272727] text-xl p-2 rounded-full hidden md:inline cursor-pointer' onClick={() => setSidebaropen(!Sidebaropen)}> <GiHamburgerMenu/> </button>
                    <div className='flex items-center cursor-pointer' onClick={() => navigate('/')}>
                        <img src={Mytube} alt="mytube icon" className='w-15'/>
                        <span className='font-bold text-md'>MyTube</span>
                    </div>
                </div>

                {/* middle */}
                <div className='hidden md:flex items-center justify-center gap-2 flex-1 max-w-lg'>
                    <div className='flex flex-1 items-center'>
                        <input type="text" placeholder='Search' className='flex-1 bg-[#121212] px-4 py-2 rounded-l-full focus-within:outline-none border border-gray-700'/>
                        <button className='bg-[#272727] px-4 py-3 rounded-r-full border border-gray-700 cursor-pointer'> <FaSearch/> </button>
                    </div>
                    <button className='bg-[#272727] rounded-full p-3 cursor-pointer'> <FaMicrophone/> </button>
                </div>

                {/* right */}
                <div className='hidden md:flex items-center gap-3'>
                    {
                        userData?.channel && 
                        <button className='bg-[#272727] rounded-full border border-gray-600 flex gap-2 items-center px-3 py-1 cursor-pointer' onClick={() => navigate('/create')}>
                            <span className='text-2xl'>+</span>
                            <span>Create</span>
                        </button> 
                    }

                    {
                        userData?.photoUrl ? 
                            <img src={userData?.photoUrl} className='w-9 h-9 rounded-full object-cover border border-gray-700 cursor-pointer hidden md:flex' onClick={() => setPopup(prev => !prev)}/>
                            : 
                                userData?.userName ? 
                                    <span className='bg-pink-600 text-white px-3 py-1 rounded-full font-bold cursor-pointer' onClick={() => setPopup(prev => !prev)}> {userData?.userName?.[0]?.toUpperCase()} </span>
                                : 
                                    <BsFillPersonFill className='text-3xl flex text-gray-400 bg-gray-500 rounded-full p-2 cursor-pointer' onClick={() => setPopup(prev => !prev)}/>
                    }
                </div>
                <FaSearch className='md:hidden'/>
            </div>
    </header>
  )
}
