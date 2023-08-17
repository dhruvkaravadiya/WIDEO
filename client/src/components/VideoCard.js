import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <> 
    <div className="bg-slate-700 hover:bg-slate-600 rounded-2xl p-4 cursor-pointer w-full">
      <div className="mb-4">
        <img src={video.imgUrl} alt={video.title} className=" h-40 rounded-lg" />
      </div>
      <h1 className="text-xl font-semibold">{video.title}</h1>
      </div>
   </>
  );
};
export default VideoCard;
