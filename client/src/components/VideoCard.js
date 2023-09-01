import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <> 
    <div className="bg-[#222f46] hover:bg-slate-700 rounded-2xl p-4 cursor-pointer w-full">
      <div className="mb-4">
        <img src={video.imgUrl} alt={video.title} className=" object-fill w-full h-40 rounded-lg" />
      </div>
      <div className=''><img src=""/></div>
      <h1 className="text-xl font-semibold">{video.title}</h1>
      </div>
   </>
  );
};
export default VideoCard;