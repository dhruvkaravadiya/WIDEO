// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blue-violet-antelope-wrap.cyclic.app/api/auth', // Adjust this to match your backend API URL
});

export const registerUser = async (credentials) => {
  const response = await api.post('/signup',{"Upgrade-Insecure-Requests": 1,"Host": "blue-violet-antelope-wrap.cyclic.app"}, credentials);
  console.log("Register Response"+response)
  return response;
};

export const loginUser = async (credentials) => {

  console.log("Client Side - Login Method Called");
  const response = await api.post('/signin', {"Upgrade-Insecure-Requests": 1,"Host": "blue-violet-antelope-wrap.cyclic.app"},credentials);
  console.log("Login response : ", response.data);
  return response;
};

export const logoutUser = async () =>{
  return await api.post('/logout',{"Upgrade-Insecure-Requests": 1,"Host": "blue-violet-antelope-wrap.cyclic.app"}); 
}
