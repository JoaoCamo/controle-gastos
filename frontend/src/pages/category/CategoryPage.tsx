import React, { useEffect, useState } from "react";
import type { Category } from "../../types/Category";
import { deleteCategory, getCategories } from "../../services/categoryService";
import { CategoryForm } from "./CategoryForm";
import { categoryLabels } from "../../types/Category";

export const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch {
                alert("Erro carregando categorias")
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryCreated = (category: Category) => {
        setCategories((prev) => [...prev, category]);
    }
    
    const handleCategoryUpdated = (category: Category) => {
        setCategories(prev => prev.map(c => c.id === category.id ? category : c));
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir essa categoria?"))
            return;

        try {
            await deleteCategory(id);
            setCategories((prev) => prev.filter(c => c.id !== id));
        } catch {
            alert("Erro ao excluir categoria");
        }
    }

    const closeModal = () => {
        setEditingCategory(null);
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Categorias</h1>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Criar Categoria</h2>
                <CategoryForm onCategoryCreated={handleCategoryCreated}/>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left p-3">Descrição</th>
                            <th className="text-left p-3">Proposito</th>
                            <th className="text-left p-3">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((c) => (
                           <tr className="border-t" key={c.id}>
                                <td className="p-3">
                                    {c.description}
                                </td>

                                <td className="p-3">
                                    {categoryLabels[c.purpose]}
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => setEditingCategory(c)}>
                                                Editar
                                    </button>

                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(c.id)}>
                                                Excluir
                                    </button>
                                </td>
                           </tr> 
                        ))}
                    </tbody>
                </table>
            </div>

            {editingCategory && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-xl font-semibold mb-4">Editar Categoria</h2>
                        <CategoryForm categoryToEdit={editingCategory} onCategoryCreated={() => {}} onCategoryUpdated={handleCategoryUpdated} onCancelEdit={closeModal}/>
                    </div>
                </div>
            )}

        </div>
    )
}