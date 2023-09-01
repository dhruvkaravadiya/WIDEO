import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Shimmer from './Helpers/Shimmer';
export default function VideoPage() {
  const { vID } = useParams();
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getVideoDetails();
  }, []);
  const getVideoDetails = async () => {
    try {
      const response = await fetch("http://localhost:3333/api/videos/find/" + vID);
      const data = await response.json();
      setVideo(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setLoading(false);
    }
  };
  if (loading) {
    return <Shimmer />;
  }
  return (
    <div className="mt-14 w-full px-10">
      <div className="mt-4">
        <video controls className="md:w-3/4 h-50vh sm:w-full">
          <source src={video.videoUrl} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <h1 className="mt-4 text-white text-2xl font-bold">{video.title}</h1>
      <p className="text-gray-400 text-sm">{video.description}</p>
      </div>
    </div>
  );
}