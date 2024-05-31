import axios from "axios";

const api = axios.create({
    baseURL: "https://wideo-api-production.up.railway.app/api/users",
    withCredentials: true,
});

export const getUserById = async (uId) => {
    return await api.get(`/find/${uId}`);
};

export const subscribe = async (uId) => {
    return await api.put("/subscribe", uId);
};

export const unsubscribe = async (uId) => {
    return await api.put("/unsubscribe", uId);
};

export const sendEmail = async (emaildetails) => {
    return await api.post("/sendemail", emaildetails);
};
