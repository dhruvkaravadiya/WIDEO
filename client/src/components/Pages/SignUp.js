import React, { useState } from "react";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [validation, setValidation] = useState({
    name: true,
    email: true,
    password: true,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    const { name, email, password } = credentials;

    // Simple validation checks
    const isNameValid = name.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length >= 6;

    setValidation({
      name: isNameValid,
      email: isEmailValid,
      password: isPasswordValid,
    });

    if (isNameValid && isEmailValid && isPasswordValid) {
      try {

        const response = await registerUser(credentials);
        const data = response.data;
        console.log(data.user.name);
        toast.success("User Created Successfully");
        navigate("/login");
      } catch (err) {
        toast.error("Registration Failed");
        console.error(err);
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <div className="w-full mx-6 p-6 sm:w-9/12 md:w-3/12 border border-gray-700 rounded-lg shadow-md bg-[#222f46]">
        <h2 className="my-4 text-3xl text-center font-bold mb-6 text-blue-500 dark:text-blue-600">
          Create Account
        </h2>
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-slate-400"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border-gray-300 text-gray-900 rounded-lg dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${validation.name ? "" : "border-red-500"
                }`}
              placeholder="Enter Username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-slate-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border-gray-300 text-gray-900 rounded-lg dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${validation.email ? "" : "border-red-500"
                }`}
              placeholder="Your Email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-slate-400"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border-gray-300 text-gray-900 rounded-lg dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${validation.password ? "" : "border-red-500"
                  }`}
                placeholder="Your Password"
              />
              <span
                className="absolute text-slate-400  top-2 right-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible className="w-6 h-6" /> : <AiFillEye className="w-6 h-6" />}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="w-full mt-4 bg-blue-600 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover-bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign Up
          </button>
          <div className="flex gap-1 justify-center">
            <p className="text-sm font-normal text-center text-gray-500 flex justify-center dark:text-gray-400">
              Already have an account?</p>
            <Link to="/login" className="font-semibold text-sm text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
