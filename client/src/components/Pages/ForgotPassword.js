import React, { useState } from "react";
import { sendEmailForForgotPassword } from "../../api/auth";
import { toast } from "react-toastify";

export default function ForgotPassword () {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async () => {
    try {
      if (!email) {
        toast.error("Please enter your email");
        
        return;
      }
      const response = await sendEmailForForgotPassword({ email });

      toast.success("Password reset initiated. Check your email for further instructions");

    } catch (error) {
      toast.error("Password reset initiation failed");
      console.error(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <div className="w-full mx-6 p-6 sm:w-9/12 md:w-3/12 border border-gray-700 rounded-lg shadow-md bg-[#222f46]">
        <h2 className="my-4 text-3xl text-center font-bold mb-6 text-blue-500 dark:text-blue-600">
          Forgot Password
        </h2>
        <form className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-gray-300 text-gray-900 rounded-lg dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="button"
            onClick={handleEmailSubmit}
            className="w-full bg-blue-600 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};