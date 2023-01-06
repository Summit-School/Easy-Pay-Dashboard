import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileServices from "../services/profileServices";

const initialState = {
  profile: {
    email: "",
  },
};

export const getAdminInfo = createAsyncThunk(
  "profile/getAdminInfo",
  async (adminID, thunkAPI) => {
    try {
      return await profileServices.getAdminInfo(adminID);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfo.fulfilled, (state, action) => {
        state.profile.email = action.payload.email;
      })
      .addCase(getAdminInfo.rejected, (state, action) => {
        state.profile.email = "";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
