export const TransactionType = {
  Expense: "Expense",
  Income: "Income"
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  personId: number;
  categoryId: number;
}

export const transactionLabels: Record<TransactionType, string> = {
  Expense: "Despesa",
  Income: "Receita"
}