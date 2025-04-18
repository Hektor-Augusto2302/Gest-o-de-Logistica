import { IMovement } from "@/interfaces/IMovement";
import { X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

interface ModalListProps {
    selectedMovements: IMovement[];
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export default function ModalList({ selectedMovements, isModalOpen, setIsModalOpen }: ModalListProps) {
    const [movements, setMovements] = useState<{ 
        [key: string]: { code: string; name: string; quantity: number; type: string } 
    }>({});

    useEffect(() => {
        if (isModalOpen) {
            const initialMovements = selectedMovements.reduce((acc, movement) => {
                acc[movement._id] = {
                    code: movement.product?.code || "",
                    name: movement.product?.name || "",
                    quantity: movement.movementQuantity || 0,
                    type: movement.type || "",
                };
                return acc;
            }, {} as { [key: string]: { code: string; name: string; quantity: number; type: string } });

            setMovements(initialMovements);
        }
    }, [isModalOpen, selectedMovements]);

    const handleInputChange = (movementId: string, field: "code" | "name" | "quantity" | "type", value: string | number) => {
        setMovements(prev => ({
            ...prev,
            [movementId]: { ...prev[movementId], [field]: value },
        }));
    };

    const hasSelectedMovements = useMemo(() => selectedMovements.length > 0, [selectedMovements]);

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3">
            <div className="bg-white w-full max-w-lg sm:max-w-2xl p-4 sm:p-6 rounded-md shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold">Movimentações Selecionadas</h2>
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
                                <th className="px-2 sm:px-4 py-2 border-table">Quantidade</th>
                                <th className="px-2 sm:px-4 py-2 border-table">Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hasSelectedMovements ? (
                                selectedMovements.map((movement) => (
                                    <tr key={movement._id} className="border-b text-sm sm:text-base">
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <input 
                                                type="text" 
                                                className="w-full border rounded-md p-1 text-center border-table"
                                                value={movements[movement._id]?.code || ""}
                                                onChange={(e) => handleInputChange(movement._id, "code", e.target.value)}
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <input 
                                                type="text" 
                                                className="w-full border rounded-md p-1 text-center border-table"
                                                value={movements[movement._id]?.name || ""}
                                                onChange={(e) => handleInputChange(movement._id, "name", e.target.value)}
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <input 
                                                type="number" 
                                                className="w-16 sm:w-20 border rounded-md p-1 text-center border-table"
                                                min="0"
                                                value={movements[movement._id]?.quantity || ""}
                                                onChange={(e) => handleInputChange(movement._id, "quantity", Number(e.target.value))}
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-table">
                                            <input 
                                                type="text" 
                                                className="w-full border rounded-md p-1 text-center border-table"
                                                value={movements[movement._id]?.type || ""}
                                                onChange={(e) => handleInputChange(movement._id, "type", e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-3 text-gray-500">
                                        Nenhuma movimentação selecionada.
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
