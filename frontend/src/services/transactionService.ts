import { api } from "../api/api";
import type { Transaction, TransactionType } from "../types/Transaction";

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get("/transaction");
    return response.data;
}

export const createTransaction = async (transaction: Omit<Transaction, "id">): Promise<Transaction> => {
    const response = await api.post("/transaction", transaction);
    return response.data;
}

export const deleteTransaction = async (id: number) => {
    await api.delete(`/transaction/${id}`);
}

export const updateTransaction = async (id: number, transaction: {description: string, amount: number, type: TransactionType, personId: number, categoryId: number}) => {
    await api.put(`/transaction/${id}`, transaction);
}