import backimg from "../images/background.jpg";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import logo from "../images/icon-512.png";
export default function Login() {
  return (
    <div className="relative w-screen h-screen">
      <img
        src={backimg}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex items-center  justify-center">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg gap-4 z-10 sm:w-4/6 md:w-3/6 lg:w-2/6 xl:w-4/12 mx-auto p-6 flex flex-col z-10 rounded-lg">
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={logo} alt="logo" className="w-16 h-16" />
          </div>
          <div className="flex items-center flex-grow max-w-lg mx-4 mt-6">
            <button className="flex items-center justify-center w-12 h-11 bg-midnight-100 rounded-l-lg">
              <HiOutlineMail className="text-gray-600" />
            </button>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Enter Username or Email"
            />
          </div>
          <div className=" flex items-center flex-grow max-w-lg mx-4">
            <button className="flex items-center justify-center w-12 h-11 bg-midnight-100 rounded-l-lg">
              <HiOutlineLockClosed className="text-gray-600" />
            </button>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Enter Password"
            />
          </div>
          <button className="mt-8 flex items-center justify-center self-center bg-skyblue w-11/12 h-11 bg-midnight-100 rounded-lg text-midnight-300 font-bold text-xl">
              Login
          </button>
          <div className="flex flex-row justify-center gap-3"><span>Don't have and account?</span><a className="cursor-pointer text-skyblue font-bold hover:underline decoration-2">Sign Up</a></div>
        </div>
      </div>
    </div>
  );
}
