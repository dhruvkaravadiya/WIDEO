import backimg from '../images/background.jpg';
import { HiOutlineMail, HiOutlineLockClosed,HiOutlineUser } from "react-icons/hi";

export default function SignUp() {
  return (
    <div className="relative w-screen h-screen">
      <img
        src={backimg}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white bg-opacity-20 sm:w-6/12 backdrop-blur-lg gap-4 md:w-3/6 lg:w-2/6 xl:w-4/12 mx-auto p-6 flex flex-col z-10 rounded-lg">
          <div className="flex flex-col justify-center items-center gap-3">
            <span className="text-4xl font-archivo">Create Account</span>
          </div>
          <div className="flex items-center flex-grow max-w-lg mx-4 mt-6">
            <button className="flex items-center justify-center w-12 h-11 bg-white rounded-l-lg">
              <HiOutlineUser className="text-gray-600" />
            </button>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Username"
            />
          </div>
          <div className="flex items-center flex-grow max-w-lg mx-4 mt-4">
            <button className="flex items-center justify-center w-12 h-11 bg-white rounded-l-lg">
              <HiOutlineMail className="text-gray-600" />
            </button>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Email"
            />
          </div>
          <div className=" flex items-center flex-grow max-w-lg mx-4 mt-4">
            <button className="flex items-center justify-center w-12 h-11 bg-white rounded-l-lg">
              <HiOutlineLockClosed className="text-gray-600" />
            </button>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Password"
            />
          </div>
          <button className="mt-8 flex font-archivo items-center justify-center self-center w-11/12 h-11 bg-white rounded-lg text-midnight-300 font-bold text-xl">
            Sign Up
          </button>
          <div className="flex flex-row justify-center gap-3 mt-4">
            <span>Already have an account?</span>
            <a className="cursor-pointer text-blue-400 font-bold  hover:underline decoration-2">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
