import React, { useState, useEffect } from 'react';
import VideoCard from '../Shared/VideoCard';
import { getTrendingVideos } from "../../api/video";

export default function TrendingVideos (){  
  const [videos, setVideos] = useState([]);
  const setTrendingVideos = async () => {
    try {
      const response = await getTrendingVideos(); 
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
      setTrendingVideos();
  }, []);

  return (
    <div className="container mx-auto mt-14 p-4">
      <h1 className="text-2xl text-archivo font-bold text-[#43a3fc] mb-4">Your Videos</h1>
        // Display videos
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grip-cols-4">
          {videos.map((video) => (
            <VideoCard video={video} key={video._id} />
          ))}
        </div>
    </div>
  );
};

