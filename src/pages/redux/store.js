import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authReducers";
import profileReducers from "./reducers/profileReducers";
import appReducers from "./reducers/appReducers";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    profile: profileReducers,
    app: appReducers,
  },
});
