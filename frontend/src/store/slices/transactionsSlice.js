import { createSlice } from "@reduxjs/toolkit";

import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "../thunks/transactionsThunk.js";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: {
        items: [],
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: builder => {
        builder
            // getTransactions
            .addCase(getTransactions.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // addTransaction
            .addCase(addTransaction.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // updateTransaction
            .addCase(updateTransaction.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const { id } = action.payload;
                state.items = state.items.map(transaction => {
                    if (transaction.id === id) {
                        return action.payload;
                    }
                    return transaction;
                })
                state.loading = false;
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // deleteTransaction
            .addCase(deleteTransaction.pending, state => {
                state.loading = true;
                state.error = "";
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                const id = action.payload;
                state.items = state.items.filter(transaction => transaction.id !== id);

                state.loading = false;
            })
    },
});

export default transactionsSlice.reducer;