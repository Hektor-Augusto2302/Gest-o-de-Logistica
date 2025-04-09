"use client"

import { useStockMovement } from "@/hooks/useCreateMovement";
import { IMovement } from "@/interfaces/IMovement";
import { useEffect, useState } from "react";
import ListTable from "./components/ListTable";
import ModalList from "./components/ModalList";
import { useDeleteMovement } from "@/hooks/useDeleteMovement";

export default function ListMovement() {
    const { getMovements, movements, setMovements } = useStockMovement();
    const { deleteMovement, message } = useDeleteMovement(setMovements);
    const [selectedMovements, setSelectedMovements] = useState<IMovement[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getMovements();
    }, [getMovements]);

    return (
        <div className="flex-column items-center justify-center min-h-screen w-full px-4 user-form">

            <div className="flex justify-between items-center mx-3 pb-3 border-b border-gray-300 max-sm:flex-col max-sm:items-start max-sm:gap-3">
                <h1 className="text-blue-500 font-semibold">Movimentações</h1>
                {message && 
                    <div className={message.type === "error" ? "bg-red-50" : "bg-green-50"}>
                        <p className={`text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                            {message.text}
                        </p>
                    </div>
                }
                <div className="flex">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 mr-2 text-white text-center cursor-pointer
                        border-none px-4 py-4 rounded-md hover:bg-blue-200 transition duration-200"
                    >
                        + Atualizar a Movimentação
                    </button>
                </div>
            </div>

            <ListTable
                movements={movements}
                onProductSelect={setSelectedMovements}
                onDelete={deleteMovement}
            />

            <ModalList
                selectedMovements={selectedMovements} 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen} 
            />
        </div>
    );
}