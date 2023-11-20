import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRandomVideos, viewVideo } from "../../api/video";
import {
  setVideo,
  setUser,
  subUnSub,
  addComment,
  likeVideo,
  dislikeVideo,
  clearVideoState,
} from "../../slices/videoPageSlice";
import VideoPageShimmer from "../Helpers/VideoPageShimmer";
import { BiLike, BiDislike, BiSolidLike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function VideoPage() {
  const [videos, setVideos] = useState([]);
  const { vID } = useParams();
  const dispatch = useDispatch();

  const [showDescription, setShowDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const video = useSelector((state) => state.video.video);
  const user = useSelector((state) => state.video.user);
  const currUser = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const videoLikes = useSelector((state) => state.video.video.likes);
  const videoDislikes = useSelector((state) => state.video.video.dislikes);

  const videoUrl = video.videoUrl;
  const isMobileScreen = window.innerWidth <= 768;
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
  });

  //date formatter
  function formatRelativeDate(createdAt) {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifference = currentDate - createdAtDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setRandomVideos = async () => {
    try {
      const response = await getRandomVideos();
      const data = await response;
      setVideos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Subscribe to a channel
  const handleSubscription = async () => {
    console.log("Subscirbe button user : ", currUser.id);
    if (!isLoggedIn) {
      navigate('/login');
      toast.info("Login to Access this feature");
    }
    else {
      if (user.subscribers.includes(currUser.id)) {
        await api.put('/users/unsub/' + currUser.id);
      } else if (user.subscribers.includes(currUser.id) == false) {
        await api.put(`/users/sub/${currUser.id}`);
      }
    }
    dispatch(subUnSub(currUser.id));
  };

  // Like a video
  const handleLike = async () => {
    try {
      if (!currUser) {
        console.log("User is not authenticated.");
        return;
      }

      if (videoLikes.includes(currUser.id)) {
        await api.put(`/videos/removeLike/${video._id}`);
        dispatch(dislikeVideo(video._id));
        const updatedLikes = videoLikes.filter(userId => userId !== currUser.id);
        dispatch(setVideo({ ...video, likes: updatedLikes }));
      } else {
        await api.put(`/videos/like/${video._id}`);
        dispatch(likeVideo(video._id));
        dispatch(setVideo({ ...video, likes: [...videoLikes, currUser.id] }));
      }
    } catch (error) {
      console.error('Like Request Failed:', error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  // Dislike a video
  const handleDisLike = async () => {
    try {
      if (!currUser) {
        console.log("User is not authenticated.");
        return;
      }
      console.log("Video Id : "+video._id);
      if (videoDislikes.includes(currUser.id)) {
        await api.put(`/videos/removeDislike/${video._id}`);
        dispatch(likeVideo(video._id));
        const updatedDislikes = videoDislikes.filter(userId => userId !== currUser.id);
        dispatch(setVideo({ ...video, dislikes: updatedDislikes }));
      } else {
        await api.put(`/videos/dislike/${video._id}`);
        dispatch(dislikeVideo(video._id));
        dispatch(setVideo({ ...video, dislikes: [...videoDislikes, currUser.id] }));
      }
    } catch (error) {
      console.error('Dislike Request Failed:', error);
      // Handle the error, such as displaying an error message to the user
    }
  };

  //fetch video data
  const handleFetchData = async () => {
    console.log(user);
    try {
      const videoRes = await fetch("https://blue-violet-antelope-wrap.cyclic.app/api/videos/find/" + vID);
      const videoData = await videoRes.json();
      const userRes = await fetch("https://blue-violet-antelope-wrap.cyclic.app/api/users/find/" + videoData.user.id);
      const userData = await userRes.json();

      dispatch(setVideo(videoData));
      dispatch(setUser(userData));
    } catch (error) {
      console.error("Error fetching video details:", error);
      // Make sure to finish loading in case of an error
    }
  };

  //increase the video view
  const increaseView = async () => {
    console.log("here  : ", vID);
    video.views = video.views + 1;
    await viewVideo(vID);
  }

  //function to force increaseView function
  //to get executed after fetching video
  const fetchDataAndIncreaseView = async () => {
    await handleFetchData();
    increaseView();
  };

  useEffect(() => {
    console.log("Curr User : ", currUser);
    fetchDataAndIncreaseView();
    setRandomVideos();
    // Handle clear state on unmount
    return () => {
      dispatch(clearVideoState());
    };

  }, [dispatch, vID]);

  return !videoUrl ? (
    <VideoPageShimmer />
  ) : (
    <div className="mt-14 w-full lg:px-10 flex flex-col lg:flex-row gap-5 sm:px-3 md:px-4">
      <div className="lg:w-8/12 w-full order-1 lg:order-2">
        <div className="mt-4">
          {videoUrl ? (
            <video autoPlay controls preload="auto" poster={video.imgUrl} className="h-50vh rounded-2xl sm:w-full">
              <source src={videoUrl} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          ) : (
            <p>Loading video...</p>
          )}

          <div className="flex flex-row gap-4 items-end my-4 px-2">
            <h1 className="text-white text-2xl font-bold ">{video.title}</h1>
            <h1 className="text-white text-md font-regular">{video.views} views</h1>
          </div>

          {/* Render user details */}
          <div className="flex px-2 flex-col md:flex-row sm:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                preload="auto"
                className="border-2 rounded-full h-10 w-10 border-[#396983]"
                src={user?.profileImageUrl}
                alt={user.name}
              />

              <div className="flex sm:items-start items-center md:gap-0 gap-3 flex-row md:flex-col sm:flex-row lg:flex-col">
                <div className="text-md text-gray-200 font-semibold">{user.name}</div>
                <div className="text-sm text-gray-200 font-regular">{user.subscribers.length} subscribers</div>
              </div>
              {/* Conditionally apply justify-end class for "Subscribe" button */}
              <div className={`flex ${isMobileScreen ? 'justify-end' : ''}`}>
                <button onClick={handleSubscription} className="p-2 px-3 text-black font-bold test-md bg-[#2eacd6] rounded-3xl ms-6">
                  {user.subscribers?.includes(currUser.id) ? "Unsubscribe" : "Subscribe"}
                </button>
              </div>
            </div>
            {/* Render like, dislike, and share buttons */}
            <div className="flex items-center gap-4">
              <div className="flex flex-row bg-lightblue1 rounded-3xl">
                <button onClick={handleLike} className="flex flex-row rounded-l-3xl hover:bg-lightblue2">
                  {video.likes.includes(currUser.id) ? <BiSolidLike className="p-2 w-10 h-10 text-slate-400  rounded-l-3xl" /> : <BiLike className="p-2 w-10 h-10 text-slate-400  rounded-l-3xl" />}
                  <span className="text-slate-400 my-auto me-2 font-md">{video.likes?.length} likes</span>
                </button>
                <div className="w-0.5 h-full bg-slate-400"></div>
                <button onClick={handleDisLike}>
                  <BiDislike className="p-2 w-10 h-10 text-slate-400 hover:bg-lightblue2 rounded-r-3xl" />
                </button>
              </div>
              <button onClick={toggleModal} className="flex flex-row justify-center items-center bg-lightblue1 rounded-3xl hover:bg-lightblue2">
          <PiShareFat className="w-10 text-slate-400 h-10 p-2 rounded-l-3xl" />
          <span className="text-slate-400 rounded-r-3xl pe-3 font-semibold text-lg">Share</span>
        </button>
            </div>
          </div>
        </div>
        {/* Render video description */}
        <div className="my-4 mx-2 whitespace-pre-wrap dark:bg-lightblue1 rounded-xl p-3 shadow-sm">
          <div className="flex flex-row w-full justify-between">
            <h2 className="text-slate-300 w-fit mb-3 font-semibold cursor-pointer">
              Description
            </h2>
            <h2 className={`text-slate-300 w-fit mb-3 font-regular cursor-pointer`} onClick={() => setShowDescription(!showDescription)}>
              {showDescription ? <IoIosArrowUp className="rounded-full p-1 bg-darkblue2  h-7 w-7" /> : <IoIosArrowDown className="h-7 w-7 p-1 rounded-full bg-darkblue2" />}
            </h2>
          </div>
          <hr className="mb-4" />
          {showDescription ? (
            <>
              <div className="text-slate-200" dangerouslySetInnerHTML={{ __html: video.description }}></div>
              {/* Render video tags */}
              <div className="text-slate-200 mt-5 font-semibold">
                {video.tags.map((tag, index) => (
                  <i key={index}>
                    <span className="text-blue-400"> #{tag} </span>
                  </i>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="lg:w-4/12 w-full p-2 flex flex-col items-start order-1 lg:order-2">
        <h1 className="font-bold text-3xl my-3 text-sky-600 text-archivo">Recommonded</h1>
        {videos.map((vid) => (
          <Link to={"/video/" + vid._id} key={vid._id} >
            <div className="w-full my-2 h-28 flex flex-row cursor-pointer p-1 rounded-lg">
              <img src={vid.imgUrl} key={vid._id} alt={vid.title} className="h-26 w-40 rounded-xl" />
              <div className="ms-4 mt-1 flex flex-col">
                <span className="text-md font-bold text-slate-200">{vid.title}</span>
                <span className="text-md font-semibold text-slate-500">{vid.user.name}</span>
                <span className="text-md font-semibold text-slate-500">
                  {vid.views} views - {formatRelativeDate(vid.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {showModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md transition-transform scale-100 opacity-100">
          {/* Your modal content goes here */}
            <CopyToClipboard text={window.location.href} onCopy={() => setCopied(true)}>
              <button className="bg-lightblue1 text-white p-2 rounded-md hover:bg-lightblue2">
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
            </CopyToClipboard>
        </div>
      )}
    </div>
  );
}
