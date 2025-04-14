"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import StockTable from "./components/StockTable/StockTable";
import { useGetProducts } from "@/hooks/useGetProducts";
import { getStockStatus } from "./utils/getStockStatus";

export default function Stock() {
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { products, getProducts, isLoading, message } = useGetProducts();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const filteredProducts = products?.filter((product) => {
        const stockStatus = getStockStatus(product.quantity ?? 0, product.minStock ?? 0);
        
        const statusMatch = status === "" || stockStatus === status;

        const searchMatch = searchTerm === "" || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.code?.toLowerCase().includes(searchTerm.toLowerCase());

        return statusMatch && searchMatch;
    });

    return (
        <div className="user-form">
            <h1 className="text-blue-500 font-semibold items-center">Em Estoque</h1>

            <hr className="my-5 border-gray-300" />

            <div className="flex justify-between items-center mx-10 mt-5 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <div className="relative w-full max-sm:w-auto max-[414px]:ml-[-50px]">
                    <input
                        className="px-3 py-2 pl-10 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="search"
                        placeholder="Pesquisa por Nome ou Código"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                </div>
                <select
                    className="px-3 py-2 border border-gray-100 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 max-sm:mt-3"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="estoque_alto">Estoque Alto</option>
                    <option value="estoque_medio">Estoque Médio</option>
                    <option value="estoque_baixo">Estoque Baixo</option>
                    <option value="sem_estoque">Sem Estoque</option>
                </select>
            </div>

            <hr className="my-5 border-gray-300" />

            {isLoading && <p>Carregando produtos...</p>}
            {message && <p>{message.text}</p>}

            <StockTable products={filteredProducts} onProductUpdated={getProducts} />
        </div>
    );
}