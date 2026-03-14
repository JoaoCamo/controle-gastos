import React, { useState } from "react";
import { CategoryPage } from "./pages/category/CategoryPage";
import { TransactionPage } from "./pages/transaction/TransactionPage";
import { PersonPage } from "./pages/person/PersonPage";
import "./App.css"
import { PersonFullPage } from "./pages/person-full/PersonFullPage";
import { CategoryFullPage } from "./pages/category-full/CategoryFullPage";

type Page = "persons" | "categories" | "transactions" | "personFull" | "categoryFull";

const App: React.FC = () => {
    const [page, setPage] = useState<Page>("persons");

    const renderPage = () => {
        switch (page) {
            case "persons":
                return <PersonPage />;
            case "categories":
                return <CategoryPage />;
            case "transactions":
                return <TransactionPage />;
            case "personFull":
                return <PersonFullPage/>;
            case "categoryFull":
                return <CategoryFullPage/>
            default:
                return null;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md p-4 flex gap-4">
                <button
                    onClick={() => setPage("persons")}
                    className={`px-4 py-2 rounded ${
                        page === "persons" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`} >
                    Pessoas
                </button>

                <button
                    onClick={() => setPage("categories")}
                    className={`px-4 py-2 rounded ${
                        page === "categories" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300" }`} >
                    Categorias
                </button>

                <button
                    onClick={() => setPage("transactions")}
                    className={`px-4 py-2 rounded ${ 
                        page === "transactions" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300" }`} >
                    Transações
                </button>

                <button
                    onClick={() => setPage("personFull")}
                    className={`px-4 py-2 rounded ${ 
                        page === "personFull" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300" }`} >
                    Consulata totais por pessoa
                </button>

                                <button
                    onClick={() => setPage("categoryFull")}
                    className={`px-4 py-2 rounded ${ 
                        page === "categoryFull" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300" }`} >
                    Consulta totais por categoria
                </button>
            </nav>

            <main className="p-6">
                {renderPage()}
            </main>
        </div>
    )
}

export default App;