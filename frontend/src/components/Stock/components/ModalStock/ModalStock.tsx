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
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <ul>
                            {selectedProducts.length > 0 ? (
                                selectedProducts.map((product) => (
                                    <li key={product._id} className="border-b py-2">
                                        {product.code} - {product.name}
                                    </li>
                                ))
                            ) : (
                                <p>Nenhum produto selecionado.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}