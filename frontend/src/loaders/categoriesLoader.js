import { store } from "../store";
import { getCategories } from "../store/thunks/categoriesThunk.js";

export async function categoriesLoader() {
    await store.dispatch(getCategories());

    const { items, loading, error } = store.getState().categories;

    return { items, loading, error };
}

// Пометка по использовании в компоненте
// import { useLoaderData } from 'react--router-dom';
//
// function CategoriesPage() {
//     const { items: categories, loading, error } = useLoaderData();
// }