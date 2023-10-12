import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      video: {},
      user: {},
};

const videoSlice = createSlice({
      name: "video",
      initialState,
      reducers: {
            setVideo: (state, action) => {
                  state.video = action.payload;
            },
            setUser: (state, action) => {
                  state.user = action.payload;
            },
            subUnSub: (state, action) => {
                  if (state.user.subscribers.includes(action.payload)) {
                    state.user.subscribers = state.user.subscribers.filter(subsId => subsId !== action.payload);
                  } else {
                    state.user.subscribers.push(action.payload);
                  }
                },
                
            addComment: (state, action) => {
                  state.video.comments.push(action.payload)
            },
            likeVideo: (state, action) => {
                  const userId = action.payload;
                  if (!state.video.likes.includes(userId)) {
                        state.video.likes.push(userId);
                        state.video.dislikes.slice(
                              state.video.dislikes.findIndex(id=>id===userId),1
                        );
                  }
            },
            dislikeVideo: (state, action) => {
                  const userId = action.payload;
                  if (!state.video.dislikes.includes(userId)) {
                        state.video.dislikes.push(userId);
                        state.video.likes.slice(
                              state.video.likes.findIndex(id=>id===userId),1
                        );
                  }
            },
            clearVideoState: (state) => {
                  state.video = {};
                  state.user = {};
            },
      },
});

export const {
      setUser,
      setVideo,
      subUnSub,
      addComment,
      likeVideo,
      dislikeVideo,
      clearVideoState
} = videoSlice.actions;

export default videoSlice.reducer;
