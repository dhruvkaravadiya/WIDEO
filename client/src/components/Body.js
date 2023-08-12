import { useState, useEffect } from 'react';
import VideoCard from './VideoCard';

export default function Body() {
  const [videos, setVideos] = useState([]);

  const getRandomVideos = async () => {
    try {
      const response = await fetch('http://localhost:3333/api/videos/random');
      const data = await response.json();
      setVideos(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getRandomVideos();
  }, []);

  return (
    <>
      <div className="p-4 mt-14 sm:ml-64">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </div>
    </>
  );
}
