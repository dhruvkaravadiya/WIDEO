import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoPageSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  video: videoReducer
});

export default rootReducer;
