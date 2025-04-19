"use client";

import { useState, useEffect } from "react";
import { IMovement } from "@/types/IMovement";
import { useUpdateMovement } from "@/hooks/useUpdateMovement";
import { Dispatch, SetStateAction } from "react";

type UpdateMovementModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movement: IMovement | null;
  setMovements: Dispatch<SetStateAction<IMovement[]>>;
};

export default function UpdateMovementModal({
  isOpen,
  onClose,
  movement,
  setMovements,
}: UpdateMovementModalProps) {
  const { updateMovement, loading, error } = useUpdateMovement();
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState<"entrada" | "saida">("entrada");

  useEffect(() => {
    if (movement) {
      setQuantity(movement.movementQuantity);
      setType(movement.type);
    }
  }, [movement]);

  const handleSubmit = async () => {
    if (!movement) return;
    const updated = await updateMovement(movement._id, {
      movementQuantity: quantity,
      type,
    });

    if (updated) {
      setMovements((prev) =>
        prev.map((m) =>
          m._id === movement._id
            ? {
                ...m,
                movementQuantity: updated.movement.movementQuantity,
                type: updated.movement.type,
                unitPrice: updated.movement.unitPrice,
                totalPrice: updated.movement.totalPrice,
              }
            : m
        )
      );
      onClose();
    }
  };

  if (!isOpen || !movement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-blue-500">
          Atualizar Movimentação
        </h2>

        <p className="mb-2 text-black-700">
          <strong>Produto:</strong> {movement.product.name}
        </p>

        <label className="block mb-2">
          Quantidade:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded mt-1"
          />
        </label>

        <label className="block mb-4">
          Tipo:
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "entrada" | "saida")}
            className="w-full border px-2 py-1 rounded mt-1"
          >
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </label>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
