import React, { useState } from "react";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice"

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
        id:response.data.user._id,
        name: response.data.user.name, 
        email: response.data.user.email,
        password: response.data.user.password,
      };
          // Check if the "access_token" cookie already exists
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      // Set the "access_token" cookie if it doesn't exist
      Cookies.set("access_token", token, {
        expires: 12000000,
        secure: true,
        sameSite: "None",
        httpOnly: true,
      });
    }
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(login(userData));
      
      Cookies.set("access_token", token, {
        expires: 12000000,
        secure: true,
        sameSite: "None"
        });

      console.log("Headers : "+response.headers);
      console.log("User : "+ JSON.stringify(userData));
      console.log("Cookies : ",Cookies.get("access_token"));
      console.log("Response : "+response.data.user);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed");
      console.log(err);
    }
  };

  return (
    <div className="flex w-full items-center justify-center mx-auto p-5">
      <div className="w-full sm:w-9/12 md:w-4/12 p-4 rounded-lg border border-gray-200 shadow-md bg-[#222f46] dark:border-gray-700">
        <h2 className="my-4 text-4xl font-bold text-center text-white">
          LOGIN
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-slate-200">
              {" "}
              {/* Updated htmlFor and placeholder */}
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name" // Updated name attribute
              value={credentials.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-slate-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Your Password"
            />
          </div>
          <div className="flex w-full justify-between">
            <div>
              <span
                htmlFor="rememberMe"
                className="font-semibold ml-2 text-blue-400 cursor-pointer hover:text-blue-300"
              >
                Forgot Password ?
              </span>
            </div>
            <div>
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                id="rememberMe"
              />
              <label htmlFor="rememberMe" className="ml-2 text-slate-200">
                Remember Me
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
