import { IProduct } from "@/interfaces/IProduct";
import { X } from "lucide-react";

interface ModalStockProps {
    selectedProducts: IProduct[];
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function ModalStock({ selectedProducts, isModalOpen, setIsModalOpen } : ModalStockProps) {

    if (!isModalOpen) return null;

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-md shadow-lg w-1/3">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-semibold">Produtos Selecionados</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <X className="w-6 h-6 cursor-pointer" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse">
                                <thead>
                                    <tr className="text-left text-sm">
                                        <th className="px-4 py-2">Código</th>
                                        <th className="px-4 py-2">Nome</th>
                                        <th className="px-4 py-2">Categoria</th>
                                        <th className="px-4 py-2">Quantidade</th>
                                        <th className="px-4 py-2">Movimentação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedProducts.length > 0 ? (
                                        selectedProducts.map((product) => (
                                            <tr key={product._id} className="">
                                                <td className="px-4 py-2 border-table">{product.code || "N/A"}</td>
                                                <td className="px-4 py-2 border-table">{product.name || "N/A"}</td>
                                                <td className="px-4 py-2 border-table">{product.category || "N/A"}</td>
                                                <td className="px-4 py-2 border-table">
                                                    <input 
                                                        type="number" 
                                                        className="w-20 border-table rounded-md p-1 text-center"
                                                        min="0"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 border-table">
                                                    <select className="border-table rounded-md p-1">
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
            )}
        </>
    );
}