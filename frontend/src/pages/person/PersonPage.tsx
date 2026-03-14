import React, { useState, useEffect } from "react";
import type { Person } from "../../types/Person";
import { getPersons, deletePerson } from "../../services/personService";
import { PersonForm } from "./PersonForm";

export const PersonPage: React.FC = () => {

    const [persons, setPersons] = useState<Person[]>([]);
    const [editingPerson, setEditingPerson] = useState<Person | null>(null);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const data = await getPersons();
                setPersons(data);
            }
            catch {
                alert("Erro carregando pessoas");
            }
        };

        fetchPersons();
    }, []);

    const handlePersonCreated = (person: Person) => {
        setPersons((prev) => [...prev, person]);
    };

    const handlePersonUpdate = (person: Person) => {
        setPersons(prev => prev.map(p => p.id === person.id ? person : p))
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir essa pessoa?"))
            return;

        try {
            await deletePerson(id);
            setPersons((prev) => prev.filter((p) => p.id !== id));
        }
        catch {
            alert("Erro ao excluir pessoa");
        }
    };

    const closeModal = () => {
        setEditingPerson(null);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Pessoas
            </h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    Criar pessoa
                </h2>

                <PersonForm onPersonCreated={handlePersonCreated} />
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Nome</th>
                            <th className="text-left p-3">Idade</th>
                            <th className="text-left p-3">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {persons.map((p) => (
                            <tr key={p.id} className="border-t">
                                <td className="p-3">
                                    {p.name}
                                </td>

                                <td className="p-3">
                                    {p.age}
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => setEditingPerson(p)}>
                                        Editar
                                    </button>

                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        onClick={() => handleDelete(p.id)}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {editingPerson && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-xl font-semibold mb-4">
                            Editar pessoa
                        </h2>

                        <PersonForm personToEdit={editingPerson} onPersonCreated={() => {}} onPersonUpdated={handlePersonUpdate} onCancelEdit={closeModal}/>
                    </div>
                </div>
            )}

        </div>
    );
};