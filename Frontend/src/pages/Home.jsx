import React, { useState } from 'react'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { Categories } from '../components/Categories';
import { Outlet } from 'react-router-dom';
import { Profile } from '../components/Profile';
import { useLocation } from 'react-router-dom'

export const Home = () => {
  const [Sidebaropen, setSidebaropen] = useState(true);
  const [popup, setPopup] = useState(false);
  const location = useLocation();

  return (
    <div className='min-h-screen relative bg-[#0f0f0f]'>
      {/* header */}
      <Header Sidebaropen={Sidebaropen} setSidebaropen={setSidebaropen} setPopup = {setPopup}/>

      {/* sidebar for mobile and laptop view */}
      <Sidebar Sidebaropen={Sidebaropen}/>

      {/* main section */}
      <main className={`overflow-y-auto p-4 flex flex-col pb-16 transition-all duration-300 ${Sidebaropen ? 'md:ml-40' : 'md:ml-15'}`}>

        {location.pathname === '/' && <Categories/>}

        {popup && <Profile/>}

        <div className='mt-10'>
          <Outlet/>
        </div>

      </main>

    </div>
  )
}
