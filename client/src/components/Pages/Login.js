import React from "react";
import { useState } from "react";
export default function Login() {
  
  return (
    <div className="flex w-full items-center justify-center mx-auto p-5">
      <div className="w-full sm:w-9/12 md:w-4/12 p-4 rounded-lg border border-gray-200 shadow-md bg-[#222f46] dark:border-gray-700">
        <h2 className="my-4 text-4xl font-bold text-center text-white">
          LOGIN
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="unameemail" className="block text-slate-200">
              Username or Email
            </label>
            <input
              type="text"
              id="unameemail"
              name="unameemail"
              className="w-full px-4 py-2 border rounded  focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter Username / Email"
            />
          </div>
          <div>
            <label htmlFor="Password" className="block text-slate-200">
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Your Password"
            />
          </div>
          <div className="flex w-full justify-between">
            <div>
              
            <span htmlFor="rememberMe" className="font-semibold ml-2 text-blue-400 cursor-pointer hover:text-blue-300">
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
            </label></div>
            
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
