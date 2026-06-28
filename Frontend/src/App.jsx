import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { toast, ToastContainer } from "react-toastify"
import { GetCurrentUser } from './customHooks/GetCurrentUser'
import { MobileProfile } from './components/MobileProfile'
import { ForgotPassword } from './components/ForgotPassword'
import { CreateChannel } from './pages/channel/CreateChannel'
import { ViewChannel } from './pages/channel/ViewChannel'
import { GetChannelData } from './customHooks/GetChannelData'
import { UpdateChannel } from './pages/channel/UpdateChannel'
import { useSelector } from 'react-redux'
import { CreatePage } from './pages/CreatePage'
import { CreateVideo } from './pages/video/CreateVideo'
import { Short } from './pages/short/CreateShort'
import { Playlist } from './pages/playlist/CreatePlaylist'
import { Post } from './pages/post/CreatePost'
import { GetVideoData } from './customHooks/GetVideoData'

export const backendURL = "http://localhost:3000";

const RouteProtection = ({userData, children}) => {
  if(!userData){
    toast.error("Please signup first to use this feature", { pauseOnHover: false });
    return <Navigate to="/" replace/>
  }
  return children;
}

export const App = () => {
  GetCurrentUser();
  GetChannelData();
  // GetVideoData();

  const {userData} = useSelector(state => state.user);
  // console.log(userData);

  return (
    <>
      <ToastContainer position="top-center" theme='dark' pauseOnHover='false'/>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route path='/mobileProfile' element={<RouteProtection userData={userData}><MobileProfile/></RouteProtection>}/>
          <Route path='/viewChannel' element={<RouteProtection userData={userData}><ViewChannel/></RouteProtection>}/>
          <Route path='/updateChannel' element={<RouteProtection userData={userData}><UpdateChannel/></RouteProtection>}/>
          <Route path='/create' element={<RouteProtection userData={userData}><CreatePage/></RouteProtection>}/>
          <Route path='/createVideo' element={<RouteProtection userData={userData}><CreateVideo/></RouteProtection>}/>
          {/* <Route path='/createShort' element={<RouteProtection userData={userData}><Short/></RouteProtection>}/>
          <Route path='/createPlaylist' element={<RouteProtection userData={userData}><Playlist/></RouteProtection>}/>
          <Route path='/createPost' element={<RouteProtection userData={userData}><Post/></RouteProtection>}/> */}
        </Route>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/forgotPass' element={<ForgotPassword/>}/>
        <Route path='/createChannel' element={<RouteProtection userData={userData}><CreateChannel/></RouteProtection>}/>
      </Routes>
    </>
  )
}