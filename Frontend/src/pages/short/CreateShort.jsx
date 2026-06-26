import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { backendURL } from '../../App';

export const Short = () => {
  const [short, setShort] = useState(null);
  const [shortData, setShortData] = useState({title : "", description : "", tags : ""});
  const [loading, setLoading] = useState(false);
  const {channelData} = useSelector(state => state.user);
  const navigate = useNavigate();

  const changeShortData = (e) => {
    const {name, value} = e.target;
    setShortData({...shortData, [name] : value});
  }

  const handleUploadShort = async() => {
    const {title, description, tags} = shortData;
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(tags.split(',').map(tag => tag.trim())));
    formData.append("short", short);
    formData.append("channelId", channelData._id);

    try {
      const response = await axios.post(`${backendURL}/api/content/createShort`, formData, {withCredentials : true});
      console.log(response.data);
      toast.success(response.data.message, {pauseOnHover: false} );
      navigate('/create');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-[80vh] bg-[#0f0f0f] flex flex-col pt-5'>
      <main className='flex flex-1 justify-center items-center px-4 py-6'>
        <div className='bg-[#212121] p-6 rounded-xl w-full max-w-3xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* left sie */}
          <div className='flex justify-center items-start'>
            <label htmlFor="short" className='flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg cursor-pointer bg-[#181818] overflow-hidden w-full md:w-55 h-full accept-[9/16] hover:border-orange-500'>
              {
                short ? 
                  <video src={URL.createObjectURL(short)} className='w-full h-full object-cover' controls/>
                : 
                  <div className='flex flex-col items-center justify-center gap-1 py-4'>
                    <IoCloudUploadOutline className='text-4xl text-gray-400 mb-2'/>
                    <p className='text-gray-300 text-sm text-center px-2'> Click to upload short</p>
                    <span className='text-[12.5px] text-gray-600 text-xs'> MP4 or MOV - Max 60s </span>
                  </div>
              }
              <input type="file" id='short' className='hidden' accept='video/mp4, video/quicktime' onChange={(e) => setShort(e.target.files[0])}/>
            </label>
          </div>

          {/* right side */}
          <div className='flex flex-col space-y-4'>
            <input type="text" placeholder='Title*' name='title' value={shortData.title} onChange={changeShortData} className='w-full p-3 rounded-lg bg-[#212121] border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none'/>

            <input type="text" placeholder='Description*' name='description' value={shortData.description} onChange={changeShortData} className='w-full p-3 rounded-lg bg-[#212121] border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none'/>

            <input type="text" placeholder='Tags* (comma seperated)' name='tags' value={shortData.tags} onChange={changeShortData} className='w-full p-3 rounded-lg bg-[#212121] border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none'/>

            <button disabled={!shortData.title || !shortData.tags || !shortData.description || loading} className='w-full bg-orange-400 hover:bg-orange-500 py-3 rounded-lg font-medium disabled:bg-gray-500 flex items-center justify-center' onClick={handleUploadShort}>{loading ? <ClipLoader color='white' size={25}/> : "Upload Short"}</button>

            {loading && <p className='text-center text-gray-300 text-sm animate-pulse'>Short uploading please wait....</p>}
          </div>
        </div>
      </main>
    </div>
  )
}
