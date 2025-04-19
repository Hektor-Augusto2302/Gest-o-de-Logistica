"use client";

import { IProduct } from "@/types/IProduct";
import { useState } from "react";
import { useUpdateProduct } from "@/hooks/useUpdateProduct";

interface ModalStockActionsProps {
  product: IProduct;
  onClose: () => void;
  onSave: () => void;
}

export default function ModalStockActions({
  product,
  onClose,
  onSave,
}: ModalStockActionsProps) {
  const [name, setName] = useState(product.name || "");
  const [minStock, setMinStock] = useState(product.minStock ?? 0);
  const [description, setDescription] = useState(product.description || "");

  const { updateProduct, loading, error } = useUpdateProduct();

  const handleSubmit = async () => {
    try {
      const dataToUpdate = {
        name,
        description,
        minStock,
      };

      await updateProduct(product._id, dataToUpdate);
      onSave();
      onClose();
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Atualizar Produto</h2>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label
              className="text-sm font-medium text-zinc-700 mb-1"
              htmlFor="name"
            >
              Nome do Produto
            </label>
            <input
              id="name"
              className="p-2 rounded border border-zinc-400"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-sm font-medium text-zinc-700 mb-1"
              htmlFor="description"
            >
              Descrição do Produto
            </label>
            <input
              id="description"
              className="p-2 rounded border border-zinc-400"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label
              className="text-sm font-medium text-zinc-700 mb-1"
              htmlFor="minStock"
            >
              Estoque Mínimo
            </label>
            <input
              id="minStock"
              className="p-2 rounded border border-zinc-400"
              type="number"
              placeholder="Estoque mínimo"
              value={minStock}
              onChange={(e) => setMinStock(Number(e.target.value))}
            />
          </div>
        </div>

        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

        <div className="flex justify-end gap-2 mt-6">
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
