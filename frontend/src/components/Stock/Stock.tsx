"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Stock() {
    const [status, setStatus] = useState("");

    return (
        <div className="user-form p-5">
            <div className="flex justify-between items-center mx-3 pb-3 border-b border-gray-300">
                <h1 className="text-blue-500 font-semibold">Em Estoque</h1>
                <Link
                    href="/" 
                    className="bg-blue-500 text-white text-center cursor-pointer
                    border-none px-4 py-4 rounded-md hover:bg-blue-200 transition duration-200"
                >
                    + Novo Estoque
                </Link>
            </div>

            <div className="flex justify-between items-center mx-10 mt-5">
                <div className="relative">
                    <input
                        className="px-3 py-2 pl-10 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="search" 
                        placeholder="Pesquisa Rápida"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                </div>

                <select
                    className="px-3 py-2 border border-gray-100 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="disponivel">Estoque Alto</option>
                    <option value="esgotado">Estoque Médio</option>
                    <option value="pendente">Estoque Baixo</option>
                    <option value="pendente">Sem Estoque</option>
                </select>
            </div>
        </div>
    );
}