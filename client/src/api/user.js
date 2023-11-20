import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/users',
  withCredentials:true
});

export const getUserById = async (uId) => {
      return await api.get(`/find/${uId}`);
};

export const subscribe =  async (uId) => {
      return await api.put('/subscribe' , uId);
}

export const unsubscribe = async (uId)=> {
      return await api.put('/unsubscribe' , uId);
}

export const sendEmail = async (emaildetails) => {
      return await api.post('/sendemail' , emaildetails);
}