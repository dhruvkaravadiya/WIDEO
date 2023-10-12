import { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "../Helpers/Shimmer";
import { Link } from "react-router-dom";
import { getRandomVideos } from "../../api/video";
import RobotGif from '../../assets/images/404 Robot.gif'
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Body({ sidebarOpen }) {
  const [videos, setVideos] = useState([]);
  const [filterVideos, setFilterVideos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const setRandomVideos = async () => {
    try {
      const response = await getRandomVideos();
      const data = await response;
      setVideos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const performSearch = () => {
    const searchTextLower = searchText.toLowerCase();
    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(searchTextLower)
    );
    setFilterVideos(filteredVideos);
    setSearchActive(true);
  };

  //reset each state variable
  const resetBody = () => {
    setSearchText(""); 
    setSearchActive(false);
    setRandomVideos();
    setFilterVideos([]); 
  };

  useEffect(() => {
    setRandomVideos();
  }, []);

  useEffect(() => {
    performSearch(searchText);
  }, [videos]);

  function DisplayCards() {
    if (videos?.length === 0) {
      return <Shimmer />;
    } else if (searchActive && filterVideos.length > 0) {
      return (
        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grip-cols-4">
          {filterVideos.map((video) => (
            <Link to={"/video/" + video._id} key={video._id}>
              <VideoCard video={video} />
            </Link>
          ))}
        </div>
      );
    } else {
      return (
        <>
          <div className="flex flex-col gap-5 mt-14 justify-center bg-indigo text-white">
            <img src={RobotGif} className='self-center rounded-2xl' alt="not found" width={300} height={300} />
            
            <button onClick={resetBody}  className='px-4 py-3 bg-[#24324b] flex gap-2 items-center justify-center hover:bg-[#30415e] rounded-md border-skyblue mt-3 text-sm font-montserrat w-max self-center'>
              <AiOutlineArrowLeft /> <span>Go Back</span>
            </button>
          </div>
        </>
      );
    }
  }

  return (
    <div className={`body-container ${sidebarOpen ? 'ml-64' : ''} flex-grow`}>
      <div className="p-4 mt-14">
        <div className="flex flex-row justify-center items-center p-1 w-full mb-4">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                performSearch();
              }
            }}
            className="w-8/12 px-4 py-2 rounded-lg focus:outline-none focus:outline-gray-500 placeholder-gray-500 text-gray-800 bg-[#222f46] dark:text-white"
            placeholder="Search..."
          />
          <button
            className="px-4 py-2 ms-2 rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 text-white transition duration-300"
            onClick={performSearch}
          >
            Search
          </button>
        </div>
        <DisplayCards />
      </div>
    </div>
  );
}
