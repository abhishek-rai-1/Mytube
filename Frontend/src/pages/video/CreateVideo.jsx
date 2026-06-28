import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { backendURL } from '../../App';
import { uploadToCloudinary } from '../../../utils/UploadToCloudinary';
import { getCloudinarySignature } from '../../customHooks/GetCloudinarySignature';

export const CreateVideo = () => {
    const [videoContent, setVideoContent] = useState({ video : null, thumbnail : null,  title : "", description : "", tags : "" })
    const [loading, setLoading] = useState(false);
    const {channelData} = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleChanges = (e) => {
        const {name} = e.target; 
        if(name === 'thumbnail' || name === 'video')
            setVideoContent({...videoContent, [name] : e.target.files[0]});
        else
            setVideoContent({...videoContent, [name] : e.target.value})
    }

    const allowedVideos = ["video/mp4", "video/webm", "video/quicktime"];

    const handleUploadVideo = async() => {
        const {video, thumbnail, title, description, tags} = videoContent;

        if (!allowedVideos.includes(video.type)) {
            toast.error("Only MP4, WEBM and MOV are allowed.");
            return;
        }

        if (video.size > 500 * 1024 * 1024) {
            toast.error("Video must be under 500 MB");
            return;
        }

        try {
            setLoading(true);

            await axios.post(`${backendURL}/api/content/validateVideoChannel`, {channelId : channelData._id}, {withCredentials : true});

            const sign = await getCloudinarySignature();

            const thumbnailUrl = await uploadToCloudinary(thumbnail, sign, "image");
            console.log(thumbnailUrl);
            const videoUrl = await uploadToCloudinary(video, sign, "video");
            console.log(videoUrl);


            // const [thumbnailUrl, videoUrl] = await Promise.all([ uploadToCloudinary(thumbnail, sign, "image"), uploadToCloudinary(video, sign, "video") ]);

            const backendData = {title, description, thumbnailUrl : videoUrl.url, videoUrl : videoUrl.url, channelId : channelData._id,
                tags : JSON.stringify(tags.split(',').map(tag => tag.trim()))
            }

            const response = await axios.post(`${backendURL}/api/content/createVideo`, backendData, {withCredentials : true});
            console.log(response.data);
            toast.success(response.data.message, {pauseOnHover: false} );

            navigate('/create');

        }catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className='w-full min-h-[80vh] bg-[#0f0f0f] flex justify-center items-center mt-12 py-4'>
            <div className='bg-[#212121] rounded-xl w-full max-w-2xl shadow-lg space-y-6 p-6'>

                {/* upload video */}
                <label htmlFor="video" className='cursor-pointer border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-1 hover:border-orange-500'>
                    <input type="file" id='video' name="video" onChange={handleChanges} accept='video/*' className='w-full p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-orange-600 focus:outline-none cursor-pointer'/>
                </label>

                <input type="text" name='title' value={videoContent.title} onChange={handleChanges} placeholder='Title*' className='w-full p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-orange-600 focus:outline-none'/>

                <textarea placeholder='Description*' name='description' value={videoContent.description} onChange={handleChanges} className='w-full p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-orange-600 focus:outline-none'/>

                <input type="text" name='tags' value={videoContent.tags} onChange={handleChanges} placeholder='Tags*' className='w-full p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-orange-600 focus:outline-none'/>

                {/* upload thumbnail */}
                <label htmlFor="thumbnail" className='block cursor-pointer'>
                    {
                        videoContent.thumbnail ? 
                            <img src={URL.createObjectURL(videoContent.thumbnail)} className='w-full rounded-lg border border-gray-700 mb-2 object-cover'/> 
                        :
                            <div className='w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 border border-gray-700 mb-2 cursor-pointer'>Click to upload thumbnail</div>
                    }
                    <input type="file" accept='image/*' name="thumbnail" onChange={handleChanges} id='thumbnail' className='hidden'/>
                </label>

                <button className={`w-full bg-orange-500 hover:bg-orange-700 py-3 cursor-pointer rounded-lg font-medium disabled:bg-gray-600 flex items-center justify-center`} disabled={!videoContent.title || !videoContent.description || !videoContent.thumbnail || !videoContent.tags || !videoContent.video || loading} onClick={handleUploadVideo}> {loading ? <ClipLoader color='white' size={25}/> : "Upload Video"} </button>

                {loading && <p className='text-center text-gray-300 text-sm animate-pulse'>Uploading please wait....</p>}
            </div>
        </div>
    )
}
