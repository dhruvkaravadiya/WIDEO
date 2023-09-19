import axios from 'axios';

const api = axios.create({
      baseURL: 'http://localhost:3333/api/videos', // Adjust this to match your backend API URL
});

export const getRandomVideos = async () => {
      const response =  await api.get('/random');
      const data = await response.data;
      return data;
}

export const getTrendingVideos = async () => {
      const response =  await api.get('/trending');
      const data = await response.data;
      return data;
}

export const getVideoByTags = async () => {
      return await api.get('/tags');
}

export const getSubscribedVideos = async () => {
      return await api.get('/');
}

export const getVideoOfUser = async () => {
      return await api.get('/:id');
}

export const getVideosByTitle = async (searchText) => {
      return await api.get('/search',searchText);
}

export const getVideoById = async (videoId) => {
      return await api.get('/find/:id',videoId);
}

export const viewVideo = async (videoId) => {
      return await api.put('/:id',videoId);
}

