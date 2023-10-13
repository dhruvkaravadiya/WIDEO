import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blue-violet-antelope-wrap.cyclic.app/api/users',
});

export const getUserById = async (uId) => {
      return await api.get(`/find/${uId}`);
};

export const subscribe =  async (uId) => {
      return await api.put('/subscribe' , uId);
}