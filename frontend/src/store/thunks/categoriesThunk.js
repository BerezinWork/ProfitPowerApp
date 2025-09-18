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
    async({ id, type, newName }, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/api/categories/${id}`, { type, newName });
            return {type, data: res.data};
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
    async({ id, type }, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${API_URL}/api/categories/${id}`, {data: {type}});
            return { id, type };
        } catch (err) {
            console.error(`Failed to delete category: ${err}`);
            return rejectWithValue(err.response?.data?.message || 'Something went wrong');
        }
    }
);