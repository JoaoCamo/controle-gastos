import React, { useState, useEffect } from "react";
import { TransactionType, type Transaction } from "../../types/Transaction";
import { TransactionType as transactionType } from "../../types/Transaction";
import { createTransaction, updateTransaction } from "../../services/transactionService";
import { getPersons } from "../../services/personService";
import { getCategories } from "../../services/categoryService";
import { transactionLabels } from "../../types/Transaction";
import type { Person } from "../../types/Person";
import type { Category } from "../../types/Category";

interface TransactionFromProps {
    onTransactionCreated: (transaction: Transaction) => void;
    onTransactionUpdated?: (transaction: Transaction) => void;
    transactionToEdit?: Transaction | null;
    onCancelEdit?: () => void;
}

export const TransactionForm: React.FC<TransactionFromProps> = ({ onTransactionCreated, onTransactionUpdated, transactionToEdit, onCancelEdit }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState<number | "">("");
    const [type, setType] = useState<transactionType>("Expense");
    const [personId, setPersonId] = useState<number | "">("");
    const [categoryId, setCategoryId] = useState<number | "">("");
    const [persons, setPersons] = useState<Person[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchPersons = async () => {
            const data = await getPersons();
            setPersons(data);
        };

        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        };

        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount);
            setType(transactionToEdit.type);
            setPersonId(transactionToEdit.personId);
            setCategoryId(transactionToEdit.categoryId);
        }

        fetchPersons();
        fetchCategories();
    }, [transactionToEdit]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        if (!description || !amount || !type || !personId || !categoryId)
            return alert("Todos os campos são obrigatórios");

        try {
            if (transactionToEdit) {
                await updateTransaction(transactionToEdit.id, { description, amount, type, personId, categoryId });
                alert("Transação atualizada");
                onTransactionUpdated?.({ id:transactionToEdit.id, description, amount, type, personId: Number(personId), categoryId: Number(categoryId) })
                onCancelEdit?.();
            }
            else {
                const newTransaction = await createTransaction({ description, amount: Number(amount), type, personId: Number(personId), categoryId: Number(categoryId) })
                onTransactionCreated(newTransaction);
            }

            setDescription("");
            setAmount("");
            setType("Expense");
            setPersonId("");
            setCategoryId("");
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro criando transação");
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Descrição:</label>
                <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                       type="text"
                       value={description}
                       maxLength={400}
                       onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Valor:</label>
                <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                       type="number"
                       value={amount}
                       onChange={(e) => setAmount(Number(e.target.value))}/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Tipo:</label>
                <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={type} onChange={(e) => setType(e.target.value as transactionType)}>
                            {Object.values(TransactionType).map((t) => (
                                <option key={t} value={t}>
                                    {transactionLabels[t]}
                                </option>
                            ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Pessoa:</label>
                <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={personId} onChange={(e) => setPersonId(Number(e.target.value))}>
                            <option value={""}>Selecione uma pessoa</option>
                            {persons.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Categoria:</label>
                <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
                        <option value={""}>Selecione uma categoria</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.description}
                            </option>
                        ))}
                </select>
            </div>

            <div className="flex gap-3 mt-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" 
                    type="submit">
                    {transactionToEdit ? "Atualizar transação" : "Criar transação"}
                </button>
                
                {transactionToEdit && (
                    <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        type="button" onClick={onCancelEdit}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}