import React, { useState, useEffect } from "react";
import type { Person } from "../../types/Person";
import { createPerson, updatePerson } from "../../services/personService";

interface PersonFormProps {
    onPersonCreated: (person: Person) => void;
    onPersonUpdated?: (person: Person) => void;
    personToEdit?: Person | null;
    onCancelEdit?: () => void;
}

export const PersonForm: React.FC<PersonFormProps> = ({
    onPersonCreated, onPersonUpdated, personToEdit, onCancelEdit }) => {

    const [name, setName] = useState("");
    const [age, setAge] = useState<number | "">("");

    useEffect(() => {
        if (personToEdit) {
            setName(personToEdit.name);
            setAge(personToEdit.age);
        }
        else {
            setName("");
            setAge("");
        }
    }, [personToEdit]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!name || !age)
            return alert("Nome e idade são obrigatórios");

        try {
            if (personToEdit) {
                await updatePerson(personToEdit.id, { name, age: Number(age) });
                alert("Pessoa atualizada");
                onPersonUpdated?.({id: personToEdit.id, name, age: Number(age), transactions: personToEdit.transactions})
                onCancelEdit?.();
            }
            else {
                const newPerson = await createPerson({ name, age: Number(age), transactions: [] });
                onPersonCreated(newPerson);
            }

            setName("");
            setAge("");
        }
        catch (error: any) {
            alert(error?.response?.data?.message || "Erro salvando pessoa");
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Nome:</label>
                <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                       type="text"
                       maxLength={200}
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Idade:</label>
                <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-32"
                       type="number"
                       value={age}
                       onChange={(e) => setAge(Number(e.target.value))}/>
            </div>

            <div className="flex gap-3 mt-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    type="submit">
                    {personToEdit ? "Atualizar pessoa" : "Criar pessoa"}
                </button>

                {personToEdit && (
                    <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        type="button" onClick={onCancelEdit}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};