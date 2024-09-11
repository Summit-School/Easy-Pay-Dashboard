import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/authServices";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
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

export const updatePassword = createAsyncThunk(
  "authentication/updatePassword",
  async (data, thunkAPI) => {
    try {
      return await authServices.updatePassword(data);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("authentication/logout", async () => {
  return await authServices.logout();
});

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
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.userMessage = action.payload; // error message from thunkAPI above
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
