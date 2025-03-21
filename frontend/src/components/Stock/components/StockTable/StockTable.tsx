"use client";

import { useState } from "react";
import { IProduct } from "@/interfaces/IProduct";

interface StockTableProps {
    products: IProduct[];
    onProductSelect: (selectedProducts: IProduct[]) => void;
}

export default function StockTable({ products, onProductSelect }: StockTableProps) {
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

    const toggleProductSelection = (product: IProduct) => {
        const isSelected = selectedProducts.some((p) => p._id === product._id);
        let updatedSelection;

        if (isSelected) {
            updatedSelection = selectedProducts.filter((p) => p._id !== product._id);
        } else {
            updatedSelection = [...selectedProducts, product];
        }

        setSelectedProducts(updatedSelection);
        onProductSelect(updatedSelection);
    };

    const toggleAllSelection = () => {
        const newSelection = selectedProducts.length === products.length ? [] : [...products];
        setSelectedProducts(newSelection);
        onProductSelect(newSelection);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="text-center">
                        <th className="px-4 py-2">
                            <input
                                type="checkbox"
                                className="w-5 h-5"
                                checked={selectedProducts.length === products.length && products.length > 0}
                                onChange={toggleAllSelection}
                            />
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
                            statusColor = "bg-red-600";
                        } else if (quantity <= minStock) {
                            statusText = "Estoque Baixo";
                            statusColor = "bg-orange-600";
                        } else if (quantity <= minStock * 1.05) {
                            statusText = "Estoque Médio";
                            statusColor = "bg-yellow-600";
                        } else {
                            statusText = "Estoque Alto";
                            statusColor = "bg-green-600";
                        }

                        return (
                            <tr key={product._id} className="text-center">
                                <td className="px-4 py-2 border-table">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5"
                                        checked={selectedProducts.some((p) => p._id === product._id)}
                                        onChange={() => toggleProductSelection(product)}
                                    />
                                </td>
                                <td className="px-4 py-2 border-table">{product.code || "N/A"}</td>
                                <td className="px-4 py-2 border-table">{product.name}</td>
                                <td className="px-4 py-2 border-table">{product.category || "N/A"}</td>
                                <td className="px-4 py-2 border-table">{quantity}</td>
                                <td className="px-4 py-2 border-table">{minStock}</td>
                                <td className={`px-4 py-2 font-semibold border-table rounded-full ${statusColor}`}>
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