import React, { useState, useEffect } from "react";
import type { Category } from "../../types/Category";
import { getCategoriesWithTransactions } from "../../services/categoryService";
import { TransactionType } from "../../types/Transaction";

export const CategoryFullPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategoriesWithTransactions();
            setCategories(data);
        }

        fetchCategories();
    });

    const getTotalIncome = (category: Category) => {
        var total = 0;

        category.transactions.filter(t => t.type == TransactionType.Income).forEach(t => {
            total += t.amount;
        });

        return total;
    }

    const getFullIncome = () => {
        var total = 0;

        categories.forEach(c => {
            c.transactions.filter(t => t.type == TransactionType.Income).forEach(t => {
                total += t.amount;
            })
        })

        return total;
    }

    const getTotalExpense = (category: Category) => {
        var total = 0;

        category.transactions.filter(t => t.type == TransactionType.Expense).forEach(t => {
            total += t.amount;
        })

        return total;
    }

    const getFullExpense = () => {
        var total = 0;

        categories.forEach(c => {
            c.transactions.filter(t => t.type == TransactionType.Expense).forEach(t => {
                total += t.amount;
            })
        })

        return total;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Categorias
            </h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Descrição</th>
                            <th className="text-left p-3">Total Receitas</th>
                            <th className="text-left p-3">Total Despesas</th>
                            <th className="text-left p-3">Total Liquido</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="p-3">
                                    {c.description}
                                </td>

                                <td className="p-3">
                                    {getTotalIncome(c)}
                                </td>

                                <td className="p-3">
                                    {getTotalExpense(c)}
                                </td>

                                <td className="p-3">
                                    {getTotalIncome(c) - getTotalExpense(c)}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th className="text-left p3"></th>
                            <th className="text-left p-3">{getFullIncome()}</th>
                            <th className="text-left p-3">{getFullExpense()}</th>
                            <th className="text-left p-3">{getFullIncome() - getFullExpense()}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}