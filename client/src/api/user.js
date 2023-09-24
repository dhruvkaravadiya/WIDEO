import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api/users',
});

export const getUserById = async (uId) => {
      return await api.get(`/find/${uId}`);
};

export const subscribe =  async (uId) => {
      return await api.put('/subscribe' , uId);
}