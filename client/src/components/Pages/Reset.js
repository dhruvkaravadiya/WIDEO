import React, { useState } from "react";
import { resetPassword } from "../../api/auth";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Reset() {
      const { token } = useParams();
      const [resetData, setResetData] = useState({
            newPassword: "",
            confirmNewPassword: "",
      });

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setResetData({ ...resetData, [name]: value });
      };

      const handleResetPassword = async () => {
            try {
                  console.log("Frontend Token : " + JSON.stringify(token));
                  // Add validation for matching passwords if needed
                  if (resetData.newPassword !== resetData.confirmNewPassword) {
                        toast.error("Passwords do not match");
                        return;
                  }
                  const response = await resetPassword(token,resetData);
                  console.log(response);
                  toast.success("Password reset successful");
            } catch (error) {
                  // Handle the error, display error toast
                  toast.error("Password reset failed");
                  console.error(error);
            }
      };

      return (
            <div className="flex w-full items-center justify-center min-h-screen">
                  <div className="w-full mx-6 p-6 sm:w-9/12 md:w-3/12 border border-gray-700 rounded-lg shadow-md bg-[#222f46]">
                        <h2 className="my-4 text-3xl text-center font-bold mb-6 text-blue-500 dark:text-blue-600">
                              Reset Password
                        </h2>
                        <form className="space-y-4">
                              <div>
                                    <label
                                          htmlFor="newPassword"
                                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-slate-400"
                                    >
                                          New Password
                                    </label>
                                    <input
                                          type="password"
                                          id="newPassword"
                                          name="newPassword"
                                          value={resetData.newPassword}
                                          onChange={handleInputChange}
                                          className="w-full px-4 py-2 border-gray-300 text-gray-900 rounded-lg dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          placeholder="Enter New Password"
                                    />
                              </div>
                              <div>
                                    <label
                                          htmlFor="confirmNewPassword"
                                          className="block mb-1 text-sm font-medium text-gray-900 dark:text-slate-400"
                                    >
                                          Confirm New Password
                                    </label>
                                    <input
                                          type="password"
                                          id="confirmNewPassword"
                                          name="confirmNewPassword"
                                          value={resetData.confirmNewPassword}
                                          onChange={handleInputChange}
                                          className="w-full px-4 py-2 border-gray-300 text-gray-900 rounded-lg dark:bg-darkblue2 outline-none border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          placeholder="Re-Enter New Password"
                                    />
                              </div>
                              <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="w-full bg-blue-600 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              >
                                    Reset Password
                              </button>
                              <div className="flex justify-center gap-1">
                                    <p className="text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                                          Remember your password?{" "}
                                    </p>
                                    <Link to="/login" className="font-semibold text-sm text-blue-500 hover:underline">
                                          Log In
                                    </Link>
                              </div>
                        </form>
                  </div>
            </div>
      );
}
