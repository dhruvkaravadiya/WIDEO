import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVideoById } from "../api/video";
import { getUserById } from "../api/user"

export const fetchVideoData = createAsyncThunk("video/fetchVideoData", async (vID, { rejectWithValue }) => {
      try {
            const videoData = await getVideoById(vID);
            const userData = await getUserById(videoData.user.id);

            return {
                  user: userData,
                  subscribers: userData.subscribers,
                  video: videoData,
                  likes: videoData.likes,
                  dislikes: videoData.dislikes,
                  comments: videoData.comments,
                  tags: videoData.tags
            };
      } catch (error) {
            return rejectWithValue(error.message);
      }
});
