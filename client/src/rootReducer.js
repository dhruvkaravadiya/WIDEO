import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import videoReducer from "./slices/videoPageSlice";

export default rootReducer = combineReducers({
      auth : authReducer,
      video : videoReducer
});
