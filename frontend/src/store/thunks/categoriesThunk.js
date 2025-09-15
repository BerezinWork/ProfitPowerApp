import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../../constants/api.js";

import axios from "axios";

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async(_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/api/categories`);

            return res.data;
        } catch(err) {
            console.error(`Failed to get categories: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async({ type, oldName, newName }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/api/categories`, { type, oldName, newName });
            return res.data;
        } catch(err) {
            console.error(`Failed to update category: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

export const addCategory = createAsyncThunk(
    "categories/addCategory",
    async(categoryData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/api/categories`, categoryData);
            return res.data;
        } catch (err) {
            console.error(`Failed to create category: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async({ type, name }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${API_URL}/api/categories`, {data: {type, name}});
            return { type, name };
        } catch (err) {
            console.error(`Failed to delete category: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);