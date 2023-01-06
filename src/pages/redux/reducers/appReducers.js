import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appServices from "../services/appServices";

const initialState = {
  conversionRate: 0,
};

export const setRate = createAsyncThunk(
  "app/setRate",
  async (rate, thunkAPI) => {
    try {
      return await appServices.setRate(rate);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCxnRate = createAsyncThunk(
  "app/getCxnRate",
  async (thunkAPI) => {
    try {
      return await appServices.getCxnRate();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(setRate.fulfilled, (state, action) => {
        state.conversionRate = action.payload.cfa;
      })
      .addCase(setRate.rejected, (state, action) => {
        state.conversionRate = 0;
      })

      .addCase(getCxnRate.fulfilled, (state, action) => {
        state.conversionRate = action.payload.cfa;
        console.log(action.payload.cfa);
      })
      .addCase(getCxnRate.rejected, (state, action) => {
        state.conversionRate = 0;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = appSlice.actions;

export default appSlice.reducer;
