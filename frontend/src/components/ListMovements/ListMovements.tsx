"use client";

import { useStockMovement } from "@/hooks/useCreateMovement";
import { IMovement } from "@/types/IMovement";
import { useEffect, useState } from "react";
import ListTable from "./components/ListTable/ListTable";
import UpdateMovementModal from "./components/UpdateMovementModal/UpdateMovementModal";
import { useDeleteMovement } from "@/hooks/useDeleteMovement";

export default function ListMovement() {
  const { getMovements, movements, setMovements } = useStockMovement();
  const { deleteMovement, message } = useDeleteMovement(setMovements);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<IMovement | null>(null);

  const handleOpenUpdateModal = (movement: IMovement) => {
    setSelectedMovement(movement);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getMovements();
  }, [getMovements]);

  return (
    <div className="user-form">
      <h1 className="text-blue-500 font-semibold">Movimentações</h1>

      {message && (
        <div className={message.type === "error" ? "bg-red-50" : "bg-green-50"}>
          <p className={`text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {message.text}
          </p>
        </div>
      )}

      <ListTable
        movements={movements}
        onDelete={deleteMovement}
        onUpdate={handleOpenUpdateModal}
      />

      <UpdateMovementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movement={selectedMovement}
        setMovements={setMovements}
      />
    </div>
  );
}