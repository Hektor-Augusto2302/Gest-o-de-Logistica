"use client";

import { IProduct } from "@/interfaces/IProduct";

interface StockTableProps {
    products: IProduct[];
}

export default function StockTable( { products }: StockTableProps ) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="text-center">
                        <th className="px-4 py-2">
                            <input type="checkbox" className="w-5 h-5" />
                        </th>
                        <th className="px-4 py-2">Código</th>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Categoria</th>
                        <th className="px-4 py-2">Quantidade</th>
                        <th className="px-4 py-2">Estoque/Mínimo</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={7} className="py-1">
                            <div className="w-full h-1 bg-gray-300"></div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    {products?.map((product) => {
                        const minStock = product.minStock ?? 0;
                        const quantity = product.quantity ?? 0;
                        let statusText = "";
                        let statusColor = "";

                        if (quantity === 0) {
                        statusText = "Sem Estoque";
                        statusColor = "text-red-600";
                        } else if (quantity <= minStock) {
                        statusText = "Estoque Baixo";
                        statusColor = "text-orange-600";
                        } else if (quantity <= minStock * 1.05) {
                        statusText = "Estoque Médio";
                        statusColor = "text-yellow-600";
                        } else {
                        statusText = "Estoque Alto";
                        statusColor = "text-green-600";
                        }

                        return (
                        <tr key={product._id} className="text-center">
                            <td className="px-4 py-2 border-table">
                            <input type="checkbox" className="w-5 h-5" />
                            </td>
                            <td className="px-4 py-2 border-table">{product.code || "N/A"}</td>
                            <td className="px-4 py-2 border-table">{product.name}</td>
                            <td className="px-4 py-2 border-table">{product.category || "N/A"}</td>
                            <td className="px-4 py-2 border-table">{quantity}</td>
                            <td className="px-4 py-2 border-table">{minStock}</td>
                            <td className={`px-4 py-2 font-semibold border-table ${statusColor}`}>
                            {statusText}
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}