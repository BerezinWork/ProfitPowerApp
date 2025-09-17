import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../../constants/api.js";

import axios from "axios";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async(_, { rejectWithValue }) => {
      try {
          const res = await axios.get(`${API_URL}/api/transactions`);

          return res.data;
      } catch(err) {
          console.error(`Failed to get transactions: ${err}`);
          return rejectWithValue(err.response?.data?.message || 'Something went wrong');
      }
  }
);

export const getTransactionById = createAsyncThunk(
    "transactions/getTransactionById",
    async(id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/api/transactions/${id}`);
            return res.data;
        } catch(err) {
            console.error(`Failed to get transaction by id: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async(updateData, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/api/transactions/${updateData.id}`, updateData);
            return res.data;
        } catch(err) {
            console.error(`Failed to update transaction: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async(addData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/api/transactions`, addData);
            return res.data;
        } catch(err) {
            console.error(`Failed to add transaction: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async(id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${API_URL}/api/transactions/${id}`);
            return id;
        } catch(err) {
            console.error(`Failed to delete transaction: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);