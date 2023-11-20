import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Websitelogo from "../../../public/icon-512.png";
import { GoHomeFill } from "react-icons/go";
import { MdSubscriptions, MdWatchLater, MdFeedback, MdVideoLibrary, MdHistory } from "react-icons/md";
import { BsGithub, BsFillTelephoneFill } from "react-icons/bs";
import { BiLibrary, BiSolidLike, BiSolidVideoPlus } from "react-icons/bi";
import { RiSettings4Fill, RiFireFill } from "react-icons/ri";
import { HiMiniBars3 } from "react-icons/hi2"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../api/auth";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiSolidUserCircle } from "react-icons/bi";

function MenuNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const accountDropdownRef = useRef(null);

  const handleLogout = async () => {
    const response = await logoutUser();
    dispatch(logout());
    localStorage.removeItem("userData");
    navigate('/');
    console.log(response);
  };

  const checkLogin = () => {
    if (isLoggedIn) {
      navigate('/newvideo');
    }
    else {
      navigate('/login');
      toast.info("Login to Access this feature");
    }
  }

  // Add a click event listener to the document to close the dropdown
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        accountDropdownOpen &&
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setAccountDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [accountDropdownOpen]);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdownOpen(!accountDropdownOpen);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-darkblue1 dark:border-gray-700">
        <div className="p-3 flex items-center justify-between">
          <div className="cursor-pointer p-2 bg-lightblue1 hover:bg-lightblue2 rounded-lg" onClick={toggleSidebar}>
            <HiMiniBars3 className="text-white h-5 w-5" />
          </div>
          <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <a href="/" className="flex items-center">
              <img src={Websitelogo} className="h-8" alt="FlowBite Logo" />
              <span className="self-center text-xl font-semibold ml-1 text-white">
                IDEO
              </span>
            </a>
          </div>
          <div className="flex flex-row gap-3 justify-center items-center">

            <button onClick={checkLogin} className="px-2 justify-center rounded-lg">
              <BiSolidVideoPlus className="text-slate-400 w-7 h-7" />
            </button>

            {isLoggedIn ? (
              <div className="cursor-pointer relative" onClick={toggleAccountDropdown}>
                {!user.profileImageUrl 
                ? (<BiSolidUserCircle className="w-7 h-7 text-slate-400"/>) 
                : (<img src={user.profileImageUrl} className="rounded-full border-2" width={"32px"} />
                )}

                {accountDropdownOpen && (
                  <div className="absolute bg-[#222f46] right-0 w-auto h-auto border dark:border-gray-700 rounded-lg shadow-lg">
                    <div className="p-2 flex flex-col gap-2 text-white">
                      <span className="font-archivo text-sm">{user.name}</span>
                      <span className="font-archivo text-sm">{user.email}</span>
                    </div>
                    <hr className="mt-1" />
                    <button onClick={handleLogout} className="p-2 w-full text-red-500 font-bold hover:bg-red-500 hover:text-slate-700 rounded-bl-lg rounded-br-lg">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="font-semibold text-md text-blue-600 px-2 py-1 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:text-darkblue1 rounded-lg border-2 border-blue-600">
                <button>Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200   dark:bg-[#02142e] dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-[#02142e]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GoHomeFill
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trending"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiFireFill
                  className="w-5 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 21"
                />
                <span className="ml-3">Trending</span>
              </Link>
            </li>
           
            <li>
              <Link
                to="/yourvideos"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdVideoLibrary
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                />

                <span className="flex-1 ml-3 whitespace-nowrap">
                  Your Videos
                </span>
              </Link>
            </li>
           
            <li>
              <Link
                to="/feedback"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdFeedback
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                />

                <span className="flex-1 ml-3 whitespace-nowrap">Feedback</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsFillTelephoneFill
                  className="w-6 h-6 flex ps-1 pt-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                />

                <span className="flex-1 ml-3 whitespace-nowrap">
                  Contact Us
                </span>
              </Link>
            </li>
            <li>
              <a
                href="https://www.github.com/dhruvkaravadiya/WIDEO"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BsGithub
                  className="w-7 h-7 flex ps-1 pt-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                />

                <span className="flex-1 ml-3 whitespace-nowrap">Github</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default MenuNavbar;
