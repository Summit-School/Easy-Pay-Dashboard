import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageServices from "../services/messageServices";

const initialState = {
  messages: [],
};

export const getMessages = createAsyncThunk(
  "messenger/getMessages",
  async (userId, thunkAPI) => {
    try {
      return await messageServices.getMessages(userId);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewMessage = createAsyncThunk(
  "messenger/newMessage",
  async (messageData, thunkAPI) => {
    try {
      return await messageServices.newMessage(messageData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const messangerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messages = [];
      })
      .addCase(createNewMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(createNewMessage.rejected, (state, action) => {
        state.messages = [];
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = messangerSlice.actions;

export default messangerSlice.reducer;
