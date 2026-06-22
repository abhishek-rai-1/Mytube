import React, { useState } from 'react'
import logo from "../assets/Mytube.png"
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from "axios";
import { backendURL } from "../App";
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [steps, setSteps] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(`${backendURL}/api/auth/sendOtp`, {email}, {withCredentials : true});
            setSteps(2);
            toast.success(result.data.message, {pauseOnHover: false});
        } catch (error) {
            toast.error( error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const handleVerifyOtp = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(`${backendURL}/api/auth/verifyOtp`, {email, otp}, {withCredentials : true});
            setSteps(3);
            toast.success(result.data.message, {pauseOnHover: false}); 
        } catch (error) {
            toast.error( error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
            setSteps(2);
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    const handleResetPassword = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(`${backendURL}/api/auth/resetPassword`, {email, password}, {withCredentials : true});
            console.log(result);
            navigate('/Login');
            toast.success(result.data.message, {pauseOnHover: false}); 
        } catch (error) {
            toast.error( error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex flex-col bg-[#272727]'>
            <header className='flex items-center gap-2 p-4 border-b border-gray-600'>
                <img src={logo} alt="MyTube Logo" className='w-10 h-10'/>
                <span className='font-bold text-xl tracking-tight'>MyTube</span>
            </header>

            <main className='flex flex-1 items-center justify-center px-4'>
                { steps === 1 && 
                    <div className='bg-[#171717] rounded-2xl p-4 flex flex-col gap-4 max-w-md w-full text-xl shadow-lg'>
                        <h1 className='font-semibold'>Forget your password</h1>

                        <form className='space-y-4'>
                            <label htmlFor="email" className='text-sm'>Enter your email address</label>

                            <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email address' className='w-full border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' required/>

                            <button className='bg-amber-500 hover:bg-amber-600 w-full rounded-md py-2 cursor-pointer' onClick={handleSendOtp} disabled={loading}> {loading ? <ClipLoader color='white' size={20}/>: 'Send OTP'} </button>
                        </form>

                        <button className='text-emerald-400 hover:text-emerald-500 text-center cursor-pointer' onClick={() => navigate('/Login')}> Back to login </button>
                    </div>
                }

                { steps === 2 && 
                    <div className='bg-[#171717] rounded-2xl p-4 flex flex-col gap-4 max-w-md w-full text-xl shadow-lg'>
                        <h1 className='font-semibold'>Enter OTP</h1>

                        <form className='space-y-4'>
                            <label htmlFor="otp" className='text-sm'>Please enter 4 digit code send to your email</label>

                            <input type="text" id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='w-full border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500' required/>

                            <button className='bg-amber-500 hover:bg-amber-600 w-full rounded-md py-2 cursor-pointer' onClick={handleVerifyOtp} disabled={loading}> {loading ? <ClipLoader color='white' size={20}/> : "Verify OTP"} </button>
                        </form>

                        <button className='text-emerald-400 hover:text-emerald-500 text-center cursor-pointer' onClick={() => navigate('/Login')}> Back to login </button>
                    </div>
                }

                { steps === 3 && 
                    <div className='bg-[#171717] rounded-2xl p-4 flex flex-col gap-4 max-w-md w-full text-xl shadow-lg'>
                        <h1 className='font-semibold'>Reset your password</h1>
                        <p className='text-sm text-gray-400'>Enter a new password below to access your account</p>

                        <form className='space-y-4'>
                            <label htmlFor="pass" className='text-sm'>New Password</label>

                            <div className="w-full border focus:outline-none focus-within:border-amber-500 mb-5 border-gray-500 flex justify-between items-center rounded-md p-2">
                            
                                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-[85%] focus:outline-none" required/>
                    
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                                    {showPassword ? <FiEye /> : <FiEyeOff />}
                                </span>
                    
                            </div>

                            <button className='bg-amber-500 hover:bg-amber-600 w-full rounded-md py-2 cursor-pointer' onClick={handleResetPassword} disabled={loading}> {loading ? <ClipLoader color='white' size={20}/> : "Reset Password"} </button>
                        </form>

                        <button className='text-emerald-400 hover:text-emerald-500 text-center cursor-pointer' onClick={() => navigate('/Login')}>Back to login</button>
                    </div>
                }
            </main>
        </div>
    )
}