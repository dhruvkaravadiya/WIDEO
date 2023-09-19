// useVideo.js
import { useState, useEffect } from "react";

const useVideo = (vID) => {
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getVideoDetails();
  }, []);
  const getVideoDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3333/api/videos/find/" + vID);
      const data = await response.json();
      setVideo(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setLoading(false);
    }
  };

  return { video, loading };
};

export default useVideo;
