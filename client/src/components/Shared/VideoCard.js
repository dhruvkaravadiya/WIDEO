import React from "react";

const VideoCard = ({ video }) => {

  return (
    <>
      <div className="bg-[#222f46] hover:bg-slate-700 rounded-xl p-4 cursor-pointer w-full">
        <div className="mb-4">
          <img
            src={video.imgUrl}
            alt={video.title}
            className=" object-fill w-full h-40 rounded-lg"
          />
        </div>
        <div className="flex gap-3 w-full">
          <img className="border-2 rounded-full h-10 w-10 border-[#396983]" src={video.user.imgUrl}/>
          <div className="flex flex-col gap-0">
            <span className="text-md text-gray-200 font-semibold">
              {video.title}
            </span>
            <span className="text-sm text-gray-200 font-regular">
              {video.user.name}
            </span>
            <span className="text-sm text-gray-300 font-regular">
              {video.views} views
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoCard;
