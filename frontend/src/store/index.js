import { configureStore } from "@reduxjs/toolkit";

import transactionsReducer from "./slices/transactionsSlice.js";
import categoriesReducer from "./slices/categoriesSlice.js";

export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        categories: categoriesReducer,
    }
})