import React from "react";
import { useParams } from "react-router-dom";
import VideoPageShimmer from '../Helpers/VideoPageShimmer';
import useVideo from "../hooks/useVideo";
import { BiLike, BiDislike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";

export default function VideoPage() {
  const { vID } = useParams();
  const { video, loading } = useVideo(vID);

  if (loading) {
    return <VideoPageShimmer />;
  }

  const isMobileScreen = window.innerWidth <= 768; // Define your breakpoint for mobile screens

  return (
    <div className="mt-14 w-full lg:px-10  sm:px-3 md:px-4">
      <div className="md:w-8/12 ">
      <div className="mt-4">
        <video controls className="h-50vh rounded-2xl sm:w-full">
          <source src={video.videoUrl} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
        <div className="flex flex-row gap-4 items-end my-4 px-2">
          <h1 className="text-white text-2xl font-bold ">{video.title}</h1>
          <h1 className="text-white text-md font-regular">{video.views} views</h1>
        </div>

        <div className="flex px-2 flex-col md:flex-row sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <img className="border-2 rounded-full h-10 w-10 border-[#396983]" src={video.user.imgUrl} alt={video.user.name} />
            <div className="flex sm:items-start items-center md:gap-0 gap-3 flex-row md:flex-col sm:flex-row lg:flex-col">
              <div className="text-md text-gray-200 font-semibold">{video.user.name}</div>
              <div className="text-sm text-gray-200 font-regular">3 subscribers</div>
            </div>
            {/* Conditionally apply justify-end class for "Subscribe" button */}
            <div className={`flex ${isMobileScreen ? 'justify-end' : ''}`}>
              <button className="p-2 px-3 text-black font-bold test-md bg-[#2eacd6] rounded-3xl ms-6">Subscribe</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-row bg-lightblue1 rounded-3xl">
              <button>
                <BiLike className="p-2 w-10 h-10 text-slate-400 hover:bg-lightblue2 rounded-l-3xl" />
              </button>
              <button>
                <BiDislike className="p-2 w-10 h-10 text-slate-400 hover:bg-lightblue2 rounded-r-3xl" />
              </button>
            </div>
            <button className="flex flex-row justify-center items-center bg-lightblue1 rounded-3xl hover:bg-lightblue2">
              <PiShareFat className="w-10 text-slate-400 h-10 p-2 rounded-l-3xl" />
              <span className="text-slate-400  rounded-r-3xl pe-3 font-semibold text-lg">Share</span>
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 mx-2 whitespace-pre-wrap dark:bg-lightblue1 rounded-xl p-3 shadow-sm">
        <h2 className="text-slate-300 mb-3 font-semibold">Description</h2>
        <hr className="mb-4" />
        <div className="text-slate-200" dangerouslySetInnerHTML={{ __html: video.description }}></div>
        <div className="text-slate-200 mt-5 font-semibold"> 
          {video.tags.map((tag, index) => (
            <i><span className="text-blue-400" key={index}> #{tag} </span></i>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
