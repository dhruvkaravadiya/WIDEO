import React, { useState, useEffect } from 'react';
import ManageVideoCard from '../Shared/ManageVideoCard';
import { useSelector } from 'react-redux';

const YourVideos = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  console.log(user);
  const userId = user.id;
  const [videos, setVideos] = useState([]);

  const getUserVideos = async () => {
    try {
      const response = await fetch(`http://localhost:3333/api/videos/${userId}`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if(isLoggedIn){
      getUserVideos();
    }
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto mt-14  p-4">
      <h1 className="text-2xl text-archivo font-bold text-[#43a3fc] mb-4">Your Videos</h1>

      {isLoggedIn && (
        // Display videos
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grip-cols-4">
          {videos.map((video) => (
            <ManageVideoCard video={video} key={video._id} />
          ))}
        </div>
      )}
      {!isLoggedIn && (
        <h1 className='font-bold text-white text-sm'>Not Logged In</h1>
      )}
    </div>
  );
};

export default YourVideos;
