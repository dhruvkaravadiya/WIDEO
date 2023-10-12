import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { RiEditFill } from 'react-icons/ri';

const YourVideos = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = user.id;
  const currUser = useSelector((state) => state.auth.user);
  const [videos, setVideos] = useState([]);
  const api = axios.create({
    baseURL: 'http://localhost:3333/api/',
    withCredentials: true,
  });

  const getUserVideos = async () => {
    try {
      const response = await api.get(`videos/${userId}`);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteVideo = async (videoId) => {
    try {

      const response = await api.delete(`videos/delete/${videoId}`);
      if (response.status === 200) {
        // Video deleted successfully, update the video list
        getUserVideos();
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserVideos();
    }
  }, [isLoggedIn]);

  return (
    <div className="container mx-auto mt-14 p-4">
      <h1 className="text-2xl font-mooli font-bold text-[#43a3fc] mb-4">Your Videos</h1>

      {isLoggedIn ? (
<<<<<<< HEAD
=======
        // Display channel details and videos
>>>>>>> 5d614bb9cea42a510312d64d2113aa51932a70ad
        <div className="relative mb-8 overflow-x-auto shadow-lg sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-lightblue2 dark:text-gray-400">
              <tr className=''>
                <th scope="col" className="px-6 py-3">
                  Video
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Views
                </th>
                <th scope="col" className="px-6 py-3">
                  Likes
                </th>
                <th scope="col" className="px-6 py-3">
                  Dislikes
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr
                  key={video._id}
                  className="border-b items-center dark:border-gray-600 bg-lightblue1"
                >
                  <td className="px-6 py-4">
                    <img
                      src={video.imgUrl}
                      alt={video.title}
                      className="object-fit w-48 h-32 rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-lg">{video.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-regular text-md">{video.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-regular text-md flex items-center">
                      {video.likes.length}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span>{video.dislikes.length}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-regular text-lg">{video.comments.length}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex">
                      <Link to={`/yourvideos/edit/${video._id}`}>
                        <RiEditFill className="w-9 h-9 rounded-xl p-2 fill-blue-500 bg-[#02142e] mr-4" />
                      </Link>
                      <button onClick={() => {
                        deleteVideo(video._id);
                      }}>
                        <BiSolidTrashAlt className="w-9 h-9 rounded-xl p-2 fill-red-500 bg-[#02142e] mr-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="font-bold text-white text-sm">Not Logged In</h1>
      )}
    </div>
  );
};

export default YourVideos;
