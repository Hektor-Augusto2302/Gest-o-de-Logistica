"use client";

import { useStockMovement } from "@/hooks/useCreateMovement";
import { IMovement } from "@/interfaces/IMovement";
import { useEffect } from "react";

export default function ListMovement() {
    const { getMovements, movements } = useStockMovement();

    useEffect(() => {
        getMovements();
    }, [getMovements]);

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 user-form">
            <h2>Lista de Movimentações</h2>
            <table className="w-full border-collapse border border-gray-400 mt-4">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Produto</th>
                        <th className="border border-gray-400 px-4 py-2">Código</th>
                        <th className="border border-gray-400 px-4 py-2">Quantidade</th>
                        <th className="border border-gray-400 px-4 py-2">Tipo</th>
                        <th className="border border-gray-400 px-4 py-2">Preço Unitário</th>
                        <th className="border border-gray-400 px-4 py-2">Preço Total</th>
                        <th className="border border-gray-400 px-4 py-2">Criado por</th>
                        <th className="border border-gray-400 px-4 py-2">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map((m: IMovement) => (
                        <tr key={m._id} className="border border-gray-400">
                            <td className="border border-gray-400 px-4 py-2">{m.product.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{m.product.code}</td>
                            <td className="border border-gray-400 px-4 py-2">{m.movementQuantity}</td>
                            <td className="border border-gray-400 px-4 py-2">{m.type}</td>
                            <td className="border border-gray-400 px-4 py-2">R$ {m.unitPrice.toFixed(2)}</td>
                            <td className="border border-gray-400 px-4 py-2">R$ {m.totalPrice.toFixed(2)}</td>
                            <td className="border border-gray-400 px-4 py-2">{m.createdBy.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{new Date(m.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}