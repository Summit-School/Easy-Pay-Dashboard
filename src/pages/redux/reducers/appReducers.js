import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appServices from "../services/appServices";

const initialState = {
  conversionRate: 0,
  users: [],
  transactions: [],
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

export const getUsers = createAsyncThunk("app/getUsers", async (thunkAPI) => {
  try {
    return await appServices.getUsers();
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getTransactions = createAsyncThunk(
  "app/getTransactions",
  async (thunkAPI) => {
    try {
      return await appServices.getTransactions();
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const transactionStatus = createAsyncThunk(
  "app/transactionStatus",
  async (txnID, thunkAPI) => {
    try {
      return await appServices.transactionStatus(txnID);
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
      })
      .addCase(getCxnRate.rejected, (state, action) => {
        state.conversionRate = 0;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.users = [];
      })

      .addCase(getTransactions.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.transactions = [];
      })

      .addCase(transactionStatus.fulfilled, (state, action) => {
        state.transactions = [action.payload];
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = appSlice.actions;

export default appSlice.reducer;
