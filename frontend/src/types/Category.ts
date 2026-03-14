import type { Transaction } from "./Transaction";

export const CategoryType = {
  Expense: "Expense",
  Income: "Income",
  Both: "Both"
} as const

export type CategoryType = typeof CategoryType[keyof typeof CategoryType]

export interface Category {
  id: number;
  description: string;
  purpose: CategoryType;
  transactions: Transaction[];
}

export const categoryLabels: Record<CategoryType, string> = {
  Expense: "Despesa",
  Income: "Receita",
  Both: "Ambas"
};