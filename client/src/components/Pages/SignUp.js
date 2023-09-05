import backimg from "../../assets/images/background.jpg";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import { useState } from "react";
import { registerUser } from "../../api/auth";
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom
import { toast } from 'react-toastify';

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleRegister(){
    try{
        const userData = { name , email , password };
        await registerUser(userData);
        toast.success('User Created Successfully'); // Display toast
        navigate('/login'); // Redirect to login page
        console.log(userData);
    } 
    catch(err){
      console.error(err);
    }
  }
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
            <div className="flex items-center justify-center w-12 h-11 bg-white rounded-l-lg">
              <HiOutlineUser className="text-gray-600" />
            </div>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-grow max-w-lg mx-4 mt-4">
            <div className="flex items-center justify-center w-12 h-11 bg-white rounded-l-lg">
              <HiOutlineMail className="text-gray-600" />
            </div>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" flex items-center flex-grow max-w-lg mx-4 mt-4">
            <div className="flex items-center justify-center w-12 h-11 bg-white rounded-l-lg">
              <HiOutlineLockClosed className="text-gray-600" />
            </div>
            <input
              className="w-full h-11 px-4 py-2 rounded-r-lg bg-midnight-100 focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-8 flex font-archivo items-center justify-center self-center w-11/12 h-11 bg-white rounded-lg text-midnight-300 font-bold text-xl"
            onClick={handleRegister}
          >
            Sign Up
          </button>
          <div className="flex flex-row justify-center gap-3 mt-4">
            <span>Already have an account?</span>
            <a className="cursor-pointer text-blue-400 font-bold  hover:underline decoration-2">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
