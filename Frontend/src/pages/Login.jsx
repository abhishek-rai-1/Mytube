import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export const Login = () => {
  const [userDetails, setUserDetails] = useState({identifier : "", password: ""});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateUserDetails = (e) => {
    setUserDetails({...userDetails, [e.target.name] : e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {identifier, password} = userDetails;
    if(!identifier || !password){
      toast.error("fill all the details", {pauseOnHover: false});
      return;
    }
    try {
      const result = await axios.post(`${backendURL}/api/auth/login`, userDetails, {withCredentials: true});
      console.log(result);
      dispatch(setUserData(result.data.user));
      toast.success(result.data.message, {pauseOnHover: false});
      navigate('/');
    } catch (error) {
      toast.error( error.response?.data?.message || "Something went wrong", { pauseOnHover: false });
      console.log(`some error occured while Login : ${error.message}`);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-10">
      <div className="rounded-2xl p-4 w-full max-w-md shadow-lg bg-[#37383b]">
        <h1 className="text-center text-2xl font-semibold mb-5"> Login Creation </h1>

        <form>
          <input type="text" name="identifier" value={userDetails.identifier} onChange={updateUserDetails} placeholder="UserName / Email" className="w-full focus:outline-none p-2 rounded-md border border-gray-500 mb-5 focus:border-amber-500"/>

          <div className="w-full border focus:outline-none focus-within:border-amber-500 mb-5 border-gray-500 flex justify-between items-center rounded-md p-2">

            <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={userDetails.password} onChange={updateUserDetails} className="w-[85%] focus:outline-none" />

            <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>

          </div>

          <div className="flex justify-between items-center gap-10">
            <p className="text-amber-300 hover:text-amber-500 cursor-pointer" onClick={() => navigate("/forgotPass")}> Forgot Password </p>

            <button className="bg-green-600 rounded-md py-2 px-2 text-md font-semibold cursor-pointer hover:bg-green-700 w-[40%]" onClick={handleLogin} disabled={loading}> 
              {
                loading ? <span className="flex justify-center items-center gap-3"> <ClipLoader color='white' size={25} /> Loging... </span> : "Login"
              } 
            </button>
          </div>
          
        </form>

        <p className="mt-3 text-center"> don't have an account ? 
          <span className="text-amber-300 hover:text-amber-500 cursor-pointer" onClick={() => navigate("/signup")}> SignUp </span>
        </p>

      </div>
    </div>
  );
};