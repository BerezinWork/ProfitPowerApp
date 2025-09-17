import { store } from "../store";
import { getTransactions } from "../store/thunks/transactionsThunk.js";

export async function transactionsLoader() {
    await store.dispatch(getTransactions());

    const fullTransactionsState = store.getState().transactions;

    const { items, loading, error } = fullTransactionsState;

    if (error) {
        throw new Error(error);
    }

    return { items, loading, error };
}

// Пометка по использовании в компоненте
// import { useLoaderData } from 'react--router-dom';
//
// function TransactionsPage() {
//     const { items: transactions, loading, error } = useLoaderData();
// }