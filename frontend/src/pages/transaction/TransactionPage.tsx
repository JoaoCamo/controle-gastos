import React, { useEffect, useState } from "react";
import type { Transaction } from "../../types/Transaction";
import type { Person } from "../../types/Person";
import type { Category } from "../../types/Category";
import { deleteTransaction, getTransactions } from "../../services/transactionService";
import { getPersons } from "../../services/personService";
import { getCategories } from "../../services/categoryService";
import { TransactionForm } from "./TransactionForm";
import { transactionLabels } from "../../types/Transaction";

export const TransactionPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [persons, setPersons] = useState<Person[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch {
                alert("Erro carregando trasações");
            }
        };

        const fetchPersons = async () => {
            try {
                const data = await getPersons();
                setPersons(data);
            } catch {
                alert("Erro carregando pessoas");
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch {
                alert("Erro carregando categorias");
            }
        };

        fetchTransactions();
        fetchPersons();
        fetchCategories();
    }, []);

    const handleTransactionCreated = (transaction: Transaction) => {
        setTransactions((prev) => [...prev, transaction]);
    };

    const handleTransactionUpdate = (transaction: Transaction) => {
        setTransactions(prev => prev.map(t => t.id === transaction.id ? transaction : t))
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir essa transação?"))
            return;

        try {
            await deleteTransaction(id);
            setTransactions((prev) => prev.filter(t => t.id !== id));
        } catch {
            alert("Erro ao excluir categoria");
        }
    }

    const closeModal = () => {
        setEditingTransaction(null);
    } 

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Transações</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Criar Transação</h2>
                <TransactionForm onTransactionCreated={handleTransactionCreated}/>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Descrição</th>
                            <th className="text-left p-3">Quantidade</th>
                            <th className="text-left p-3">Tipo</th>
                            <th className="text-left p-3">Pessoa</th>
                            <th className="text-left p-3">Categoria</th>
                            <th className="text-left p-3">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((t) => (
                            <tr className="border-t" key={t.id}>
                                <td className="p-3">
                                    {t.description}
                                </td>

                                <td className="p-3">
                                    {t.amount}
                                </td>

                                <td className="p-3">
                                    {transactionLabels[t.type]}
                                </td>

                                <td className="p-3">
                                    {persons.find(p => p.id == t.personId)?.name}
                                </td>

                                <td className="p-3">
                                    {categories.find(c => c.id == t.categoryId)?.description}
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => setEditingTransaction(t)}>
                                                Editar
                                            </button>
                                    
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(t.id)}>
                                                Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingTransaction && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-xl font-semibold mb-4">Editar Transação</h2>
                        <TransactionForm transactionToEdit={editingTransaction} onTransactionCreated={() => { }} onTransactionUpdated={handleTransactionUpdate} onCancelEdit={closeModal}/>
                    </div>
                </div>
            )}

        </div>
    )
}