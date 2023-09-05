// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api/auth', // Adjust this to match your backend API URL
});

export const registerUser = async (userData) => {
  const response = await api.post('/signup', userData);
  return console.log(response);
};

export const loginUser = async (credentials) => {
  console.log("Client Side - Login Method Called");
  console.log(credentials);
  return await api.post('/signin', credentials);
};
