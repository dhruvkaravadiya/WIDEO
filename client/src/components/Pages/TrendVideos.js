import React, { useState, useEffect } from 'react';
import VideoCard from '../Shared/VideoCard';
import { getTrendingVideos } from "../../api/video";
import Shimmer from '../Helpers/Shimmer';
import { Link } from 'react-router-dom';

export default function TrendVideos (){  
  const [videos, setVideos] = useState([]);
  
  const setTrendingVideos = async () => {
    try {
      const data = await getTrendingVideos(); 
      setVideos(data);
    } catch (error) {
      console.error("Error", error);
      // console.error("Status", error.response.status);
      // console.error("Message", error.message);
      // console.error("Data", error.response.data); 
    }
  };
  useEffect(() => {
      setTrendingVideos();
  }, []);

  return (
    <div className="container mx-auto mt-14 p-4">
      <h1 className="text-2xl text-archivo font-bold text-[#43a3fc] mb-4">Trending Videos</h1>
        
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grip-cols-4">
          {Array.isArray(videos) &&videos.map((video) => (
            <Link to={"/video/"+video.id} key={video._id}><VideoCard video={video}/></Link>        
          ))}
        </div>
    </div>
  );
};

