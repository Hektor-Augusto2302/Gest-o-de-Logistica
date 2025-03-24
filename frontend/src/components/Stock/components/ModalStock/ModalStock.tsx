import { IProduct } from "@/interfaces/IProduct";
import { X } from "lucide-react";

interface ModalStockProps {
    selectedProducts: IProduct[];
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function ModalStock({ selectedProducts, isModalOpen, setIsModalOpen }: ModalStockProps) {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3">
            <div className="bg-white w-full max-w-lg sm:max-w-2xl p-4 sm:p-6 rounded-md shadow-lg">
                {/* Cabeçalho da Modal */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold">Produtos Selecionados</h2>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-red-500">
                        <X className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                {/* Conteúdo da Tabela */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm bg-gray-100">
                                <th className="px-2 sm:px-4 py-2">Código</th>
                                <th className="px-2 sm:px-4 py-2">Nome</th>
                                <th className="px-2 sm:px-4 py-2 hidden sm:table-cell">Categoria</th>
                                <th className="px-2 sm:px-4 py-2">Quantidade</th>
                                <th className="px-2 sm:px-4 py-2">Movimentação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.length > 0 ? (
                                selectedProducts.map((product) => (
                                    <tr key={product._id} className="border-b text-sm sm:text-base">
                                        <td className="px-2 sm:px-4 py-2">{product.code || "N/A"}</td>
                                        <td className="px-2 sm:px-4 py-2">{product.name || "N/A"}</td>
                                        <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">{product.category || "N/A"}</td>
                                        <td className="px-2 sm:px-4 py-2">
                                            <input 
                                                type="number" 
                                                className="w-16 sm:w-20 border rounded-md p-1 text-center"
                                                min="0"
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2">
                                            <select className="border rounded-md p-1">
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
