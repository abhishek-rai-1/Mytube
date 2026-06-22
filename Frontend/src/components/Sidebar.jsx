import React, { useState } from 'react'
import { IoMdHome } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdOutlineHistory, MdOutlinePlaylistPlay, MdOutlineOndemandVideo } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Sidebar = ({Sidebaropen}) => {
    const [selected, setSelected] = useState("Home");
    const navigate = useNavigate();
    const location = useLocation();
    const {userData} = useSelector((state) => state.user);

    const buttons = [
        { icon: <IoMdHome />, text: "Home", path: "/" },
        { icon: <SiYoutubeshorts />, text: "Shorts", path: "/shorts" },
        { icon: <MdOutlineSubscriptions />, text: "Subscriptions", path: "/subscriptions" },
        { icon: <MdOutlineHistory />, text: "History", path: "/history" },
        { icon : <MdOutlinePlaylistPlay/>, text : "Playlist", path: "/playList" },
        { icon : <MdOutlineOndemandVideo/>, text : "Save Video", path: "/saved_videos" },
        { icon : <AiOutlineLike/>, text : "Like", path: "/like" }
    ];

    const mobileView = [
        { icon: <IoMdHome />, text: "Home", path: "/" },
        { icon: <SiYoutubeshorts />, text: "Shorts", path: "/shorts" },
        { icon: "+", text: "", path: "/create" },
        { icon: <MdOutlineSubscriptions />, text: "Subscriptions", path: "/subscriptions" },
        { icon: <BsFillPersonFill />, text: "You", path: "/MobileProfile" },
    ];

    return (
        <>
            <aside className={`bg-[#0f0f0f] border-r border-gray-800 transition-all duration-300 fixed top-16 bottom-0 z-40 ${Sidebaropen ? 'w-40' : 'w-15'} hidden md:flex flex-col overflow-y-auto scrollbar-none gap-1`}>
                {
                    buttons.map(item =>
                        <button key={item.text} className={`flex items-center gap-3 p-2 rounded w-full transition-colors cursor-pointer ${Sidebaropen ? "justify-start" : "justify-center"} ${location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"}`} onClick={() => navigate(item.path)}>
                            <span className="text-lg"> {item.icon} </span>
                            {Sidebaropen && <span> {item.text} </span>}
                        </button>
                    )
                }
            </aside>
            
            {/* mobile view */}
            <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-gray-600 flex items-center justify-around py-2 z-10'>
                {
                    mobileView.map(item =>
                        item.text ?
                            <div key={item.text} className={`cursor-pointer flex flex-col items-center ${location.pathname === item.path ? 'text-gray-200' : 'text-gray-400 hover:text-gray-200'}`} onClick={() => navigate(item.path)}>
                                {
                                    item.text === 'You' ? 
                                        userData?.photoUrl ? 
                                            <img src={userData?.photoUrl} className='w-8 h-8 rounded-full object-cover border border-gray-700'/> 
                                        :
                                            userData?.userName ? 
                                                <span className='bg-pink-600 text-white px-3 py-1 rounded-full font-bold'>{userData?.userName?.[0]?.toUpperCase()}</span> 
                                            :
                                                <span> {item.icon} </span>
                                    : 
                                        <span> {item.icon} </span>
                                }
                                {item.text === 'You' && !userData && <span>{item.text}</span>}
                                {item.text !== 'You' && <span>{item.text}</span>}
                            </div>
                        :
                            <div key="create" className='bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center text-gray-50 hover:bg-gray-500 cursor-pointer text-3xl' onClick={() => navigate(item.path)}> + </div>
                    )
                }
            </nav>
        </>
    )
}
