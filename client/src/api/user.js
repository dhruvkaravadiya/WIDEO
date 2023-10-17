import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL+'/users',
  withCredentials:true
});

export const getUserById = async (uId) => {
      return await api.get(`/find/${uId}`);
};

export const subscribe =  async (uId) => {
      return await api.put('/subscribe' , uId);
}