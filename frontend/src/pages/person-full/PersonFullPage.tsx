import React, { useState, useEffect } from "react";
import type { Person } from "../../types/Person";
import { getPersonsWithTransactions } from "../../services/personService";
import { TransactionType } from "../../types/Transaction";

export const PersonFullPage: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        const fetchPersons = async () => {
            const data = await getPersonsWithTransactions();
            setPersons(data);
        }

        fetchPersons();
    });

    const getTotalIncome = (person: Person) => {
        var total = 0;

        person.transactions.filter(t => t.type == TransactionType.Income).forEach(t => {
            total += t.amount;
        });

        return total;
    }

    const getFullIncome = () => {
        var total = 0;

        persons.forEach(p => {
            p.transactions.filter(t => t.type == TransactionType.Income).forEach(t => {
                total += t.amount;
            })
        })

        return total;
    }

    const getTotalExpense = (person: Person) => {
        var total = 0;

        person.transactions.filter(t => t.type == TransactionType.Expense).forEach(t => {
            total += t.amount;
        })

        return total;
    }

    const getFullExpense = () => {
        var total = 0;

        persons.forEach(p => {
            p.transactions.filter(t => t.type == TransactionType.Expense).forEach(t => {
                total += t.amount;
            })
        })

        return total;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Pessoas
            </h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Nome</th>
                            <th className="text-left p-3">Total Receitas</th>
                            <th className="text-left p-3">Total Despesas</th>
                            <th className="text-left p-3">Total Liquido</th>
                        </tr>
                    </thead>

                    <tbody>
                        {persons.map((p) => (
                            <tr key={p.id} className="border-t">
                                <td className="p-3">
                                    {p.name}
                                </td>

                                <td className="p-3">
                                    {getTotalIncome(p)}
                                </td>

                                <td className="p-3">
                                    {getTotalExpense(p)}
                                </td>

                                <td className="p-3">
                                    {getTotalIncome(p) - getTotalExpense(p)}
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