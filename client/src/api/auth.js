// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blue-violet-antelope-wrap.cyclic.app/api/auth', // Adjust this to match your backend API URL
  withCredentials: true
});

export const registerUser = async (credentials) => {
  const response = await api.post('/signup', credentials);
  return response;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/signin', credentials);
  return response;
};

export const logoutUser = async () => {
  return await api.post('/logout');
}
