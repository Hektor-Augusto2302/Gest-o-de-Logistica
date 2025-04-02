"use client"

import { useStockMovement } from "@/hooks/useCreateMovement";
import { IMovement } from "@/interfaces/IMovement";
import { useEffect, useState } from "react";
import ListTable from "./components/ListTable";
import ModalList from "./components/ModalList";

export default function ListMovement() {
    const { getMovements, movements } = useStockMovement();
    const [selectedMovements, setSelectedMovements] = useState<IMovement[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getMovements();
    }, [getMovements]);

    return (
        <div className="flex-column items-center justify-center min-h-screen w-full px-4 user-form">

            <div className="flex justify-between items-center mx-3 pb-3 border-b border-gray-300 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <h1 className="text-blue-500 font-semibold">Movimentações</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    + Nova Movimentação
                </button>
            </div>

            <ListTable movements={movements} onProductSelect={setSelectedMovements} />

            <ModalList
                selectedMovements={selectedMovements} 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen} 
            />
        </div>
    );
}