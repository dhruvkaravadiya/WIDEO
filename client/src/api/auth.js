// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://wideo-api.up.railway.app/api/auth", // Adjust this to match your backend API URL
    withCredentials: true,
});

export const registerUser = async (credentials) => {
    return await api.post("/signup", credentials);
};

export const loginUser = async (credentials) => {
    return await api.post("/signin", credentials);
};

export const logoutUser = async () => {
    return await api.post("/logout");
};

export const sendEmailForForgotPassword = async (email) => {
    return await api.post("/forgotpassword", email);
};

export const resetPassword = async (token, data) => {
    return await api.post(`/password/reset/${token}`, data);
};
