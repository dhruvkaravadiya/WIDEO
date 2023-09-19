import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      video: {},
      user: {},
      isSubscribed: false,
      subscribers:[],
      isLiked: false,
      likes:[],
      dislikes:[],
      comments:[]
}

const videoSlice = createSlice({
      name: "video",
      initialState,
      reducers: {
            setUser:(state,action)=>{
                  state.user = action.payload;
            },
            subscribe:(state,action)=>{
                  state.isSubscribed= true;
                  state.subscribers.push(action.payload);
            },
            unsubscribe:(state,action)=>{
                  state.isSubscribed= false;
                  state.subscribers.pop(action.payload);
            },
            setVideo:(state,action)=>{
                  state.video = action.payload
            },
            setLikes:(state,action)=>{
                  state.likes = action.payload;
            },
            setDislikes:(state,action)=>{
                  state.dislikes = action.payload;
            },
            setComments:(state,action)=>{
                  state.comments = action.payload;
            },
            addComment:(state,action)=>{state.comments.push(action.payload)},
            likeVideo:(state,action)=>{
                  state.isLiked = true,
                  state.likes.push(action.payload);
            },
            dislikeVideo:(state,action)=>{
                  state.isLiked = false,
                  state.dislikes.push(action.payload);
            }
      }
});

export const {
            setVideo,
            setLikes,
            setDislikes,
            setComments,
            likeVideo,
            dislikeVideo
            } = videoSlice.actions;

export default videoSlice.reducer;