import { store } from "../store";
import { getTransactionById } from "../store/thunks/transactionsThunk.js";

export async function transactionByIdLoader({ params }) {
    await store.dispatch(getTransactionById(params.id));

    const fullTransactionsState = store.getState().transactions;

    const { currentItem, currentItemError, currentItemLoading } = fullTransactionsState;

    return { currentItem, currentItemError, currentItemLoading };
}

// Пометка по использовании в компоненте
// import { useLoaderData } from 'react--router-dom';
//
// function TransactionPage() {
//     const {
//     currentItem: transaction,
//     currentItemError: error,
//     currentItemLoading: loading
//     } = useLoaderData();
// }