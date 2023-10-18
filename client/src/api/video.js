import axios from 'axios';

const api = axios.create({
      baseURL: "https://blue-violet-antelope-wrap.cyclic.app/api/videos", // Adjust this to match your backend API URL
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

export const getVideosOfUser = async (id) => {
      return await api.get('/user/:id' , id);
}

export const getVideosByTitle = async (searchText) => {
      return await api.get('/search',searchText);
}

export const getVideoById = async (videoId) => {
      return await api.get(`/find/${videoId}`);
};

export const viewVideo = async (id) => {
      console.log("Video Id : "+id);
      const response = await api.put(`/view/${id}`);
      console.log(response.data);
      return response;
}

export const newVideo = async (video) => {
      return  await api.post("/",video);
}

export const editVideo = async (vId) => {
      return  await api.post("/:id",vId);
}

export const deleteVideo = async (vId) => {
      return  await api.delete(`/${vId}`);
}
