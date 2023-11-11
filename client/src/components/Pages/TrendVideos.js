import React, { useState, useEffect } from "react";
import VideoCard from "../Shared/VideoCard";
import Shimmer from "../Helpers/Shimmer";
import { Link } from "react-router-dom";
import { getTrendingVideos } from "../../api/video";

export default function TrendVideos({ sidebarOpen }) {
  const [videos, setVideos] = useState([]);

  const setTrendingVideos = async () => {
    try {
      const response = await getTrendingVideos();
      const data = await response;
      setVideos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setTrendingVideos();
  }, []);

  function DisplayCards() {
    if (videos?.length === 0) {
      return <Shimmer />;
    } else {
      return (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grip-cols-4">
          {videos.map((video) => (
            <Link to={"/video/" + video._id} key={video._id}>
              <VideoCard video={video} />
            </Link>
          ))}
        </div>
      );
    }
  }

  return (
    <div className={`body-container ${sidebarOpen ? 'ml-64' : ''} flex-grow`}>
      <div className="p-4 mt-14">
      <h1 className="text-2xl font-mooli font-bold text-[#43a3fc] mb-4">Trending</h1>
        <DisplayCards />
      </div>
    </div>
  );
}
