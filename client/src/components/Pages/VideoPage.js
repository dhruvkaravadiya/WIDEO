import React from "react";
import { useParams } from "react-router-dom";
import Shimmer from '../Helpers/Shimmer';
import useVideo from "../hooks/useVideo";
export default function VideoPage() {
  const { vID } = useParams();
  const {video , loading} = useVideo(vID);
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