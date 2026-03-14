import React, { useState, useEffect } from "react";
import { CategoryType, type Category } from "../../types/Category";
import type { CategoryType as categoryType } from "../../types/Category";
import { createCategory, updateCategory } from "../../services/categoryService";
import { categoryLabels } from "../../types/Category";

interface CategoryFormProps {
    onCategoryCreated: (category: Category) => void;
    onCategoryUpdated?: (category: Category) => void;
    categoryToEdit?: Category | null;
    onCancelEdit?: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ 
    onCategoryCreated, onCategoryUpdated, categoryToEdit, onCancelEdit }) => {

    const [description, setDescription] = useState("");
    const [purpose, setPurpose] = useState<categoryType>("Expense");

    useEffect(() => {
        if (categoryToEdit) {
            setDescription(categoryToEdit.description);
            setPurpose(categoryToEdit.purpose);
        }
    }, [categoryToEdit]);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!description || !purpose) 
            return alert("Descrição e proposito são obrigatórios");

        try {
            if (categoryToEdit) {
                await updateCategory(categoryToEdit.id, {description, purpose});
                alert("Categoria atualizada");
                onCategoryUpdated?.({id: categoryToEdit.id, description, purpose, transactions: categoryToEdit.transactions});
                onCancelEdit?.();
            }
            else {
                const newCategory = await createCategory({ description, purpose, transactions: [] });
                onCategoryCreated(newCategory);
            }

            setDescription("");
            setPurpose("Expense");
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erro criando categoria");
        }
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Descrição:</label>
                <input className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                       type="text"
                       value={description}
                       onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Proposito:</label>
                    <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={purpose} onChange={(e) => setPurpose(e.target.value as categoryType)}>
                                {Object.values(CategoryType).map((p) => (
                                <option key={p} value={p}>
                                    {categoryLabels[p]}
                                </option>
                            ))}
                    </select>
            </div>

            <div className="flex gap-3 mt-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" 
                    type="submit">
                    {categoryToEdit ? "Atualizar categoria" : "Criar categoria"}
                </button>
                
                {categoryToEdit && (
                    <button className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        type="button" onClick={onCancelEdit}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}