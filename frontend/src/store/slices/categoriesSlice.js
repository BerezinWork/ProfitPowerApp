import { createSlice } from "@reduxjs/toolkit";

import { getCategories, updateCategory, addCategory, deleteCategory } from "../thunks/categoriesThunk.js";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        items: {
            expense: [],
            income: [],
        },
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: builder => {
        builder
            // getCategories
            .addCase(getCategories.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // updateCategory
            .addCase(updateCategory.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const { type } = action.meta.arg;

                if(type && state.items[type]) {
                    state.items[type] = action.payload;
                } else {
                    console.warn('Could not update category: invalid type received', type);
                }

                state.loading = false;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // addCategory
            .addCase(addCategory.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                const { type } = action.meta.arg;

                if(type && state.items[type]) {
                    state.items[type] = action.payload;
                } else {
                    console.warn('Could not add category: invalid type received', type);
                }

                state.loading = false;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // deleteCategory
            .addCase(deleteCategory.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const { type, name } = action.payload;

                if(type && name && state.items[type]) {
                    state.items[type] = state.items[type].filter(category => category !== name);
                } else {
                    console.warn('Could not delete category: invalid type received', type);
                }

                state.loading = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export default categoriesSlice.reducer;