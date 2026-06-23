import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { ToastContainer } from "react-toastify"
import { Shorts } from './shorts/Shorts'
import { GetCurrentUser } from './customHooks/GetCurrentUser'
import { MobileProfile } from './components/MobileProfile'
import { ForgotPassword } from './components/ForgotPassword'
import { CreateChannel } from './pages/channel/CreateChannel'
import { ViewChannel } from './pages/channel/ViewChannel'
import { GetChannelData } from './customHooks/GetChannelData'
import { UpdateChannel } from './pages/channel/UpdateChannel'

export const backendURL = "http://localhost:3000";

export const App = () => {
  GetCurrentUser();
  GetChannelData();
  return (
    <>
      <ToastContainer position="top-center" theme='dark' pauseOnHover='false'/>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route path='/Shorts' element={<Shorts/>}/>
          <Route path='/mobileProfile' element={<MobileProfile/>}/>
          <Route path='/viewChannel' element={<ViewChannel/>}/>
          <Route path='/updateChannel' element={<UpdateChannel/>}/>
        </Route>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/forgotPass' element={<ForgotPassword/>}/>
        <Route path='/createChannel' element={<CreateChannel/>}/>
      </Routes>
    </>
  )
}
