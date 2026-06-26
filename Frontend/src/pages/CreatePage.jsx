import React, { useState } from 'react'
import { FaVideo, FaPen } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import create from "/create.png";
import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {
    const options = [
        {
            id : "video",
            icon : <FaVideo size={25}/>,
            title : "Upload Video",
            url : '/createVideo'
        },
        {
            id : "short",
            icon : <SiYoutubeshorts size={25}/>,
            title : "Create Short",
            url : '/createShort'
        },
        {
            id : "post",
            icon : <FaPen size={25}/>,
            title : "Craete Post",
            url : '/createPost'
        },
        {
            id : "playlist",
            icon : <MdOutlinePlaylistPlay size={25}/>,
            title : "New Playlist",
            url : '/createPlaylist'
        },
    ]

    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const handleRoute = () => {
        const found = options.find(opt => opt.id === selected)
        navigate(found.url);
    }

    return (
        <div className='bg-[#0f0f0f] min-h-screen px-6 py-8 mt-10 flex flex-col'>
            <header className='mb-12 border-b border-[#3f3f3f] pb-4'>
                <h1 className='text-4xl font-bold'>Create</h1>
                <p className='text-gray-400 mt-1 text-sm'>Choose what type of content you wan't to craete for your audience</p>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 flex-1'>
                {
                    options.map(opt => 
                        <div key={opt.id} className={`bg-[#1f1f1f] border border-gray-400 rounded-lg p-6 flex flex-col items-center text-center justify-center cursor-pointer ${selected === opt.id ? 'ring-2 ring-orange-500' : 'hover:bg-[#272727]'}`} onClick={() => setSelected(opt.id)}>
                            <div className='bg-[#272727] p-4 rounded-full mb-4'>{opt.icon}</div>
                            <h2 className='text-lg font-semibold'>{opt.title}</h2>
                        </div>
                    )
                }
            </div>

            <div className='mt-10 flex flex-col justify-center items-center gap-2'>
                <img src={create} alt="create logo" className='w-20'/>
                {
                    !selected ? 
                        <div className='text-center'>
                            <p className='mt-4 font-medium'>Create content on any device</p>
                            <p className='text-gray-400 text-sm'>Upload and record at home or on the go. Everything you make public will appear here.</p>
                        </div>
                    :
                        <div className='text-center'>
                            <p className='mt-4 font-medium'>Ready to create ?</p>

                            <p className='text-gray-400 text-sm'>Click below to start your {options.find(opt => opt.id === selected)?.title.toLowerCase()}</p>

                            <button className='bg-orange-400 hover:bg-orange-500 text-md hover:scale-110 rounded-full px-4 py-2 font-medium cursor-pointer transition-all duration-300 mt-4' onClick={handleRoute}>+ Create</button>
                        </div>
                }
            </div>
        </div>
    )
}
