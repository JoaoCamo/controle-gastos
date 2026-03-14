import type { Transaction } from "./Transaction";

export interface Person {
  id: number;
  name: string;
  age: number;
  transactions: Transaction[];
}