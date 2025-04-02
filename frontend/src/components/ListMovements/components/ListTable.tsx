"use client";

import { useState } from "react";
import { IMovement } from "@/interfaces/IMovement";

interface ListTableProps {
    movements: IMovement[];
    onProductSelect: (selectedProducts: IMovement[]) => void;
}

export default function ListTable({ movements, onProductSelect }: ListTableProps) {
    const [selectedProducts, setSelectedProducts] = useState<IMovement[]>([]);

    const toggleProductSelection = (movement: IMovement) => {
        const isSelected = selectedProducts.some((p) => p._id === movement._id);
        let updatedSelection;

        if (isSelected) {
            updatedSelection = selectedProducts.filter((p) => p._id !== movement._id);
        } else {
            updatedSelection = [...selectedProducts, movement];
        }

        setSelectedProducts(updatedSelection);
        onProductSelect(updatedSelection);
    };

    const toggleAllSelection = () => {
        const newSelection = selectedProducts.length === movements.length ? [] : [...movements];
        setSelectedProducts(newSelection);
        onProductSelect(newSelection);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-max w-full border-collapse hidden sm:table">
                <thead>
                    <tr className="text-center border-collapse">
                        <th className="px-4 py-2 border-table">
                            <input
                                type="checkbox"
                                className="w-5 h-5"
                                checked={selectedProducts.length === movements.length && movements.length > 0}
                                onChange={toggleAllSelection}
                            />
                        </th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Produto</th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Código</th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Quantidade</th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Tipo</th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Preço Unitário</th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Preço Total</th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Criado por</th>
                        <th className="border border-gray-400 px-4 py-2 border-table">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map((m) => (
                        <tr key={m._id} className="border border-gray-400">
                            <td className="px-4 py-2 border-table">
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 border-table"
                                    checked={selectedProducts.some((p) => p._id === m._id)}
                                    onChange={() => toggleProductSelection(m)}
                                />
                            </td>
                            <td className="border border-gray-400 px-4 py-2 border-table">{m.product.name}</td>
                            <td className="border border-gray-400 px-4 py-2 border-table">{m.product.code}</td>
                            <td className="border border-gray-400 px-4 py-2 border-table">{m.movementQuantity}</td>
                            <td className="border border-gray-400 px-4 py-2 border-table">{m.type}</td>
                            <td className="border border-gray-400 px-4 py-2 border-table">R$ {m.unitPrice.toFixed(2)}</td>
                            <td className="border border-gray-400 px-4 py-2 border-table">R$ {m.totalPrice.toFixed(2)}</td>
                            <td className="border border-gray-400 px-4 py-2 border-table">{m.createdBy.name}</td>
                            <td className="border border-gray-400 px-4 py-2 border-table">{new Date(m.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}