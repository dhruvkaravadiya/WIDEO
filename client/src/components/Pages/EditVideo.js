import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const EditVideo = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();

    const [videoDetails, setVideoDetails] = useState({
        title: "",
        description: "",
        tags: [],
        imgUrl: "",
    });

    const api = axios.create({
        withCredentials: true,
        baseURL: "https://wideo-api-production.up.railway.app/api/videos",
    });

    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await api.get(`/find/${videoId}`);
                const videoData = response.data;
                setVideoDetails({
                    title: videoData.title,
                    description: videoData.description,
                    tags: videoData.tags,
                    imgUrl: videoData.imgUrl,
                });
            } catch (error) {
                console.error("Error fetching video details:", error);
            }
        };

        fetchVideoDetails();
    }, [videoId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVideoDetails({ ...videoDetails, [name]: value });
    };

    const handleAddTag = () => {
        if (newTag.trim() !== "") {
            setVideoDetails({
                ...videoDetails,
                tags: [...videoDetails.tags, newTag],
            });
            setNewTag("");
        }
    };

    const handleRemoveTag = (tag) => {
        const updatedTags = videoDetails.tags.filter((t) => t !== tag);
        setVideoDetails({ ...videoDetails, tags: updatedTags });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/${videoId}`, videoDetails);
            console.log("Success Edit");
            navigate("/yourvideos");
            toast("Video Updated Successfully!");
        } catch (error) {
            console.error("Error updating video:", error);
        }
    };

    const [isThumbnailHovered, setIsThumbnailHovered] = useState(false);

    const toggleThumbnailHover = () => {
        setIsThumbnailHovered(!isThumbnailHovered);
    };

    return (
        <div className="bg-lightblue1 p-6 rounded-lg mx-auto mt-28 grid grid-cols-1 gap-4 border border-gray-700 h-fit shadow-[0_3px_10px_rgb(0,0,0,0.2)]  sm:grid-cols-2">
            <div className="col-span-1 me-3">
                <h2 className="text-2xl font-bold text-[#43a3fc] mb-4">
                    Edit Video
                </h2>
                <label
                    htmlFor="title"
                    className="block text-gray-400 font-semibold mb-2"
                >
                    Title :
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={videoDetails.title}
                    onChange={handleInputChange}
                    className="w-full bg-darkblue2 text-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 mb-4"
                />
                <div className="mb-4 relative">
                    <label
                        htmlFor="thumbnailUrl"
                        className="block text-gray-400 font-semibold mb-2"
                    >
                        Thumbnail :
                    </label>
                    <div
                        className={`w-full h-52 mb-2 ${
                            isThumbnailHovered ? "hover:bg-opacity-80" : ""
                        }`}
                        onMouseEnter={toggleThumbnailHover}
                        onMouseLeave={toggleThumbnailHover}
                    >
                        <img
                            src={videoDetails.imgUrl}
                            alt={videoDetails.title}
                            className={`w-full h-full object-cover rounded-md ${
                                isThumbnailHovered ? "filter brightness-50" : ""
                            }`}
                        />
                        {isThumbnailHovered && (
                            <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                                <div className="bg-black bg-opacity-50 rounded-md p-2">
                                    Select from local
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            id="thumbnailUrl"
                            name="thumbnailUrl"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-1 ms-3">
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="description"
                        className="block text-gray-400 font-semibold mb-2"
                    >
                        Description :
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={videoDetails.description}
                        onChange={handleInputChange}
                        className="w-full bg-darkblue2 text-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 resize-none h-48 mb-4"
                    />
                    <label
                        htmlFor="tags"
                        className="block text-gray-400 font-semibold mb-2"
                    >
                        Tags :
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {videoDetails.tags.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-blue-500 text-white rounded-full px-3 py-1 flex items-center"
                            >
                                {tag}
                                <button
                                    type="button"
                                    className="ml-2"
                                    onClick={() => handleRemoveTag(tag)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-red-500 hover:text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-2">
                        <input
                            type="text"
                            id="newTag"
                            name="newTag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a new tag"
                            className=" bg-darkblue2 text-slate-300 rounded-md px-3 py-2 focus:outline-none"
                        />
                        <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 ml-2"
                            onClick={handleAddTag}
                        >
                            Add Tag
                        </button>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <Link to="/yourvideos">
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVideo;
