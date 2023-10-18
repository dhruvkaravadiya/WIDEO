import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddVideo = () => {
  const navigate = useNavigate(); 
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    tags: [],
    photo: null, 
    video: null, 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails({ ...videoDetails, [name]: value });
  };

  const handleAddTag = () => {
    if (videoDetails.newTag.trim() !== "") {
      setVideoDetails({
        ...videoDetails,
        tags: [...videoDetails.tags, videoDetails.newTag],
        newTag: "",
      });
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = videoDetails.tags.filter((t) => t !== tag);
    setVideoDetails({ ...videoDetails, tags: updatedTags });
  };

  const handlephotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoDetails({ ...videoDetails, photo: file });
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoDetails({ ...videoDetails, video: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", videoDetails.title);
    formData.append("description", videoDetails.description);
    videoDetails.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    if (videoDetails.photo) {
      formData.append("photo", videoDetails.photo);
    }
    if (videoDetails.video) {
      formData.append("video", videoDetails.video);
    }

    const api = axios.create({
      withCredentials: true,
      baseURL: "https://blue-violet-antelope-wrap.cyclic.app/api/videos",
      headers: {
        "Content-Type": "multipart/form-data",
        "Origin": "https://wideo-client.vercel.app", // Replace with your actual frontend URL
      },
    });
    try {
      await api.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate('/');
      console.log("Success Edit");
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <div className="p-6 rounded-lg my-auto border border-gray-600 bg-lightblue1 shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Video</h2>
      <div className="lg:flex">
        <div className="lg:w-1/2 lg:me-2">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600 font-semibold mb-1">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={videoDetails.title}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 font-semibold mb-1">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={videoDetails.description}
              onChange={handleInputChange}
              className="w-full bg-gray-100 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 resize-none h-48"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-600 font-semibold mb-2">
              Tags:
            </label>
            <div className="flex flex-wrap gap-2">
              {videoDetails.tags.map((tag, index) => (
                <div key={index} className="bg-blue-500 text-white rounded-full px-3 py-1 flex items-center">
                  {tag}
                  <button type="button" className="ml-2" onClick={() => handleRemoveTag(tag)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500 hover:text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              id="newTag"
              name="newTag"
              value={videoDetails.newTag}
              onChange={handleInputChange}
              placeholder="Add a new tag"
              className="w-full bg-gray-100 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200 ml-2"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-4 lg:ms-2 lg:mt-0">
          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-600 font-semibold mb-1">
              Photo:
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlephotoUpload}
              className="w-full bg-gray-100 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {videoDetails.photo && (
              <img
                src={URL.createObjectURL(videoDetails.photo)}
                alt="Photo Preview"
                className="mt-2 max-w-xs rounded-md"
              />
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="video" className="block text-gray-600 font-semibold mb-1">
              Video:
            </label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={handleVideoUpload}
              className="w-full bg-gray-100 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          onClick={handleSubmit}
        >
          Upload
        </button>
        <Link to="/yourvideos">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddVideo;
