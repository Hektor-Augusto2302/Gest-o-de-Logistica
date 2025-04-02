import { IProduct } from "@/interfaces/IProduct";
import { X } from "lucide-react";
import { useState } from "react";

interface ModalStockProps {
    selectedProducts: IProduct[];
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function ModalStock({ selectedProducts, isModalOpen, setIsModalOpen }: ModalStockProps) {

    const [movements, setMovements] = useState<{ [key: string]: { code: string; name: string; quantity: number; type: "entrada" | "saida" } }>({});

    if (!isModalOpen) return null;

    const handleInputChange = (productId: string, field: "code" | "name" | "quantity" | "type", value: string | number) => {
        setMovements(prev => ({
            ...prev,
            [productId]: { ...prev[productId], [field]: value },
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3">
            <div className="bg-white w-full max-w-lg sm:max-w-2xl p-4 sm:p-6 rounded-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold">Produtos Selecionados</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-red-500">
                        <X className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm">
                                <th className="px-2 sm:px-4 py-2 border-table">Código</th>
                                <th className="px-2 sm:px-4 py-2 border-table">Nome</th>
                                <th className="px-2 sm:px-4 py-2 hidden sm:table-cell border-table">Categoria</th>
                                <th className="px-2 sm:px-4 py-2 border-table">Quantidade</th>
                                <th className="px-2 sm:px-4 py-2 border-table">Movimentação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.length > 0 ? (
                                selectedProducts.map((product) => (
                                    <tr key={product._id} className="border-b text-sm sm:text-base">
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <input 
                                                type="text" 
                                                className="w-full border rounded-md p-1 text-center border-table"
                                                value={movements[product._id]?.code || product.code || ""}
                                                onChange={(e) => handleInputChange(product._id, "code", e.target.value)}
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <input 
                                                type="text" 
                                                className="w-full border rounded-md p-1 text-center border-table"
                                                value={movements[product._id]?.name || product.name || ""}
                                                onChange={(e) => handleInputChange(product._id, "name", e.target.value)}
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 hidden sm:table-cell border-table">{product.category || "N/A"}</td>
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <input 
                                                type="number" 
                                                className="w-16 sm:w-20 border rounded-md p-1 text-center border-table"
                                                min="0"
                                                value={movements[product._id]?.quantity || ""}
                                                onChange={(e) => handleInputChange(product._id, "quantity", e.target.value)}
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <select 
                                                className="border rounded-md p-1"
                                                value={movements[product._id]?.type || "entrada"}
                                                onChange={(e) => handleInputChange(product._id, "type", e.target.value)}
                                            >
                                                <option value="entrada">Entrada</option>
                                                <option value="saida">Saída</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-3 text-gray-500">
                                        Nenhum produto selecionado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}