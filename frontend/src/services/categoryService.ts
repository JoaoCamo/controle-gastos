import { api } from "../api/api";
import type { Category, CategoryType } from "../types/Category";

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get("/category");
    return response.data;
}

export const getCategoriesWithTransactions = async (): Promise<Category[]> => {
    const response = await api.get("/category/with-transactions");
    return response.data;
}

export const createCategory = async (category: Omit<Category, "id">): Promise<Category> => {
    const response = await api.post("/category", category);
    return response.data;
}

export const deleteCategory = async (id: number) => {
    await api.delete(`/category/${id}`);
}

export const updateCategory = async (id: number, category: { description: string, purpose: CategoryType }) => {
    await api.put(`/category/${id}`, category);
}