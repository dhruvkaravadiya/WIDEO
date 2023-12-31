import React, { useState,useEffect } from "react";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/authSlice"
import { Link } from "react-router-dom";

export default function Login() {
  //we will store the username/email and password in this state variable
  const [credentials, setCredentials] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  //we will create the useContext variable to pass
  //the user credentials to the golbal user context
  const dispatch = useDispatch();
  //simple navigate to the home page
  const navigate = useNavigate();

  //generalized input change which will
  //set the state varianbles
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  //===> { handleLogin } function which does the following :
  // - execute the login user function
  // - store the response
  // - get the token from reponse
  // - get the user if from the token
  // - store the token in the cookies
  // - display the success toast on successful login
  // - finally navigate to the home page
  // - else show the error toast
  // - log the error
  const handleLogin = async () => {
    try {
      const response = await loginUser(credentials);
      const token = response.data.access_token;
      const userData = {
        id: response.data.user._id,
        name: response.data.user.name,
        email: response.data.user.email,
        password: response.data.user.password,
        profileImageUrl: response.data.user.profileImageUrl
      };
      //set credentials in the local storage
      localStorage.setItem("userData", JSON.stringify(userData));
      // Check if the "access_token" cookie already exists
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        // Set the "access_token" cookie if it doesn't exist
        Cookies.set("access_token", token, {
          expires: 12000000,
          secure: true,
          sameSite: "None",
         });
      }
      Cookies.set("access_token", token, {
        expires: 12000000,
        secure: true,
        sameSite: "None",
       });
      dispatch(login(userData));
      
      console.log("Headers : " + response.headers);
      console.log("User : " + JSON.stringify(userData));
      console.log("Cookies : ", Cookies.get("access_token"));
      const data = response.data;
      console.log("Response : " + data.user.profileImageUrl);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed");
      console.log(err);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const userDataString = localStorage.getItem("userData");

    if (accessToken && userDataString) {
      const userData = JSON.parse(userDataString);
      // Dispatch the login action with user data
      dispatch(login(userData));
    }
  }, [dispatch]);

  return (
    <div className="flex w-full items-center justify-center min-h-screen ">
      <div className="w-full mx-6 p-6 sm:w-9/12 md:w-3/12 border border-gray-700 rounded-lg shadow-md bg-[#222f46]">
      
        <h2 className="my-4 text-3xl text-center font-bold mb-6 text-blue-500 dark:text-blue-600">
          Login To WIDEO!
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-slate-400">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2  border-gray-300 text-gray-900 rounded-lg  dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-900 dark:text-slate-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2  border-gray-300 text-gray-900 rounded-lg  dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" id="rememberMe" />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                Remember Me
              </label>
            </div>
       
              <Link to="/forgotpassword">
              <span htmlFor="rememberMe" className="font-semibold text-sm ml-2 text-blue-600 dark:text-blue-500 cursor-pointer hover:text-primary-500">
                Forgot Password?
              </span>
          </Link>

          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-600 bg-primary-600 hover:bg-primary-700  text-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Login
          </button>
          <div className="flex justify-center gap-1"><p className="text-sm font-normal text-center text-gray-500 dark:text-gray-400">
            Don't have an account yet? </p><Link to='/register' className="font-semibold text-sm text-blue-500 hover:underline">Sign Up</Link></div>
          
        </form>
      </div>
    </div>
  );
}