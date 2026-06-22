import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [userDetails, setUserDetails] = useState({userName: "", email: "", password: ""});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateUserDetails = (e) => {
    setUserDetails({...userDetails, [e.target.name] : e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const {userName, email, password} = userDetails;
    if(!userName || !email || !password){
      toast.error("fill all the details", {pauseOnHover: false});
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(`${backendURL}/api/auth/signup`, userDetails, {withCredentials: true});
      toast.success(result?.data?.message, {pauseOnHover: false});
      navigate('/Login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
      console.log(`some error occured while signup : ${error.message}`);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-auto">
      <div className="rounded-2xl p-4 w-full max-w-md shadow-lg bg-[#37383b]">
        <h1 className="text-center text-2xl font-semibold mb-5"> Account Creation </h1>

        <form>
          <input type="text" name="userName" value={userDetails.userName} onChange={updateUserDetails} placeholder="UserName" className="w-full focus:outline-none p-2 rounded-md border border-gray-500 mb-5 focus:border-amber-500"/>

          <input type="email" placeholder="Email" name="email" value={userDetails.email} onChange={updateUserDetails} className="w-full focus:outline-none p-2 rounded-md border border-gray-500 focus:border-amber-500 mb-5"/>

          <div className="w-full border focus:outline-none focus-within:border-amber-500 mb-5 border-gray-500 flex justify-between items-center rounded-md p-2">

            <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={userDetails.password} onChange={updateUserDetails} className="w-[85%] focus:outline-none" />

            <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>

          </div>

          <button className="bg-green-600 rounded-md py-2 px-2 text-md font-semibold cursor-pointer hover:bg-green-700 w-full" onClick={handleSignUp} disabled={loading}> 
            {
              loading ? <span className="flex justify-center items-center gap-3"> <ClipLoader color='white' size={25} /> Wait... </span> : "Create Account"
            } 
          </button>
        </form>

        <p className="mt-3 text-center"> Already have an account ? 
          <span className="text-amber-300 hover:text-amber-500 cursor-pointer" onClick={() => navigate("/Login")}> Login </span>
        </p>

      </div>
    </div>
  );
};