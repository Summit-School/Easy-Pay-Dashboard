import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/authServices";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  userError: false,
  userSuccess: false,
  userLoading: false,
  userMessage: "",
};

// login admin
export const login = createAsyncThunk(
  "authentication/login",
  async (user, thunkAPI) => {
    try {
      return await authServices.login(user);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    reset: (state) => {
      state.userSuccess = false;
      state.userError = false;
      state.userLoading = false;
      state.userMessage = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
