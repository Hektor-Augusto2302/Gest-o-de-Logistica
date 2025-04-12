"use client";

import { IProduct } from "@/interfaces/IProduct";
import { useState } from "react";

interface ModalStockActionsProps {
  product: IProduct;
  onClose: () => void;
  onSave: (updatedProduct: IProduct) => void;
}

export default function ModalStockActions({
  product,
  onClose,
  onSave,
}: ModalStockActionsProps) {
  const [name, setName] = useState(product.name || "");
  const [code, setCode] = useState(product.code || "");
  const [category, setCategory] = useState(product.category || "");
  const [quantity, setQuantity] = useState(product.quantity ?? 0);
  const [minStock, setMinStock] = useState(product.minStock ?? 0);

  const handleSubmit = () => {
    const updatedProduct: IProduct = {
      ...product,
      name,
      code,
      category,
      quantity,
      minStock,
    };
    onSave(updatedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Atualizar Produto</h2>

        <div className="flex flex-col gap-3">
            <input
                className="p-2 rounded border border-zinc-400"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="p-2 rounded border border-zinc-400"
                placeholder="Código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <input
                className="p-2 rounded border border-zinc-400"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                className="p-2 rounded border border-zinc-400"
                type="number"
                placeholder="Quantidade"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <input
                className="p-2 rounded border border-zinc-400"
                type="number"
                placeholder="Estoque mínimo"
                value={minStock}
                onChange={(e) => setMinStock(Number(e.target.value))}
            />
        </div>

            <div className="flex justify-end gap-2 mt-6">
                <button
                    onClick={onClose}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Salvar
                </button>
            </div>
        </div>
    </div>
  );
}
