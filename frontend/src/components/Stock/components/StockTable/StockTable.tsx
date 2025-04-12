"use client";

import { useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { useAuth } from "@/hooks/useAuth";
import ModalStockActions from "../ModalStockActions/ModalStockActions";

interface StockTableProps {
  products: IProduct[];
}

export default function StockTable({ products }: StockTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<IProduct | null>(null);

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleUpdateProduct = (product: IProduct) => {
    if (!isAdmin) return;
    setProductToUpdate(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product: IProduct) => {
    if (!isAdmin) return;
    console.log("Excluir produto", product);
  };

  const handleSaveUpdatedProduct = (updatedProduct: IProduct) => {
    console.log("Salvar produto atualizado", updatedProduct);
  };

  return (
    <div className="overflow-x-auto">

      <table className="min-w-max w-full border-collapse hidden sm:table">
        <thead>
          <tr className="text-center border-collapse">
            <th className="px-4 py-2 border-table">Código</th>
            <th className="px-4 py-2 border-table">Nome</th>
            <th className="px-4 py-2 border-table">Categoria</th>
            <th className="px-4 py-2 border-table">Quantidade</th>
            <th className="px-4 py-2 border-table">Estoque/Mínimo</th>
            <th className="px-4 py-2 border-table">Status</th>
            {isAdmin && <th className="px-4 py-2 border-table">Ação</th>}
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => {
            const minStock = product.minStock ?? 0;
            const quantity = product.quantity ?? 0;

            let statusText = "";
            let statusColor = "";

            if (quantity === 0) {
              statusText = "Sem Estoque";
              statusColor = "bg-red-600 text-white";
            } else if (quantity <= minStock) {
              statusText = "Estoque Baixo";
              statusColor = "bg-orange-600 text-white";
            } else if (quantity <= minStock * 1.05) {
              statusText = "Estoque Médio";
              statusColor = "bg-yellow-600 text-black";
            } else {
              statusText = "Estoque Alto";
              statusColor = "bg-green-600 text-white";
            }

            return (
              <tr key={product._id} className="text-center border-b">
                <td className="px-4 py-2 border-table">{product.code || "N/A"}</td>
                <td className="px-4 py-2 border-table">{product.name}</td>
                <td className="px-4 py-2 border-table">{product.category || "N/A"}</td>
                <td className="px-4 py-2 border-table">{quantity}</td>
                <td className="px-4 py-2 border-table">{minStock}</td>
                <td
                  className={`px-4 py-2 w-40 font-semibold border-table rounded-full ${statusColor}`}
                >
                  {statusText}
                </td>
                {isAdmin && (
                  <td className="px-4 py-2 border-table">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleUpdateProduct(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm font-semibold rounded-full cursor-pointer"
                      >
                        Atualizar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm font-semibold rounded-full cursor-pointer"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {isModalOpen && productToUpdate && (
        <ModalStockActions
          product={productToUpdate}
          onClose={() => {
            setIsModalOpen(false);
            setProductToUpdate(null);
          }}
          onSave={handleSaveUpdatedProduct}
        />
      )}
    </div>
  );
}