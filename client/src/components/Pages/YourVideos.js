import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidTrashAlt } from "react-icons/bi";
import { RiEditFill } from "react-icons/ri";

const YourVideos = () => {
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userId = user.id;
    const currUser = useSelector((state) => state.auth.user);
    const [videos, setVideos] = useState([]);
    const api = axios.create({
        baseURL: "https://wideo-api.up.railway.app/api/videos",
        withCredentials: true,
    });
    const getUserVideos = async () => {
        try {
            const response = await api.get(`/${userId}`);
            setVideos(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const deleteVideo = async (videoId) => {
        try {
            const response = await api.delete(`/delete/${videoId}`);
            if (response.status === 200) {
                // Video deleted successfully, update the video list
                getUserVideos();
            }
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            getUserVideos();
        }
    }, [isLoggedIn]);

    return (
        <div className="container mx-auto mt-14 p-4">
            <h1 className="text-2xl font-mooli font-bold text-[#43a3fc] mb-4">
                Your Videos
            </h1>

            {isLoggedIn ? (
                <div className="relative mb-8 overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Video
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="hidden sm:table-cell px-6 py-3"
                                >
                                    Views
                                </th>
                                <th
                                    scope="col"
                                    className="hidden sm:table-cell px-6 py-3"
                                >
                                    Likes
                                </th>
                                <th
                                    scope="col"
                                    className="hidden sm:table-cell px-6 py-3"
                                >
                                    Dislikes
                                </th>
                                <th
                                    scope="col"
                                    className="hidden sm:table-cell px-6 py-3"
                                >
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
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={video.imgUrl}
                                            alt={video.title}
                                            className="object-cover w-full h-32  sm:w-48 sm:h-32 rounded-lg"
                                            style={{
                                                maxWidth: "100%",
                                                height: "auto",
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {video.title}
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-4">
                                        <span className="font-regular text-md">
                                            {video.views}
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-4">
                                        <span className="font-regular text-md flex items-center">
                                            {video.likes.length}
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-4">
                                        <span>{video.dislikes.length}</span>
                                    </td>
                                    <td className="hidden sm:table-cell px-6 py-4">
                                        <span className="font-regular text-lg">
                                            {video.comments.length}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex">
                                            <Link
                                                to={`/yourvideos/edit/${video._id}`}
                                            >
                                                <RiEditFill className="w-7 h-7 rounded-xl p-2 fill-blue-500 bg-[#02142e] mr-2 sm:mr-4" />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    deleteVideo(video._id);
                                                }}
                                            >
                                                <BiSolidTrashAlt className="w-7 h-7 rounded-xl p-2 fill-red-500 bg-[#02142e] mr-2 sm:mr-4" />
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
