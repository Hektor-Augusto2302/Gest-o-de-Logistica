"use client";

import { useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { useAuth } from "@/hooks/useAuth";
import ModalStockActions from "../ModalStockActions/ModalStockActions";
import { handleDeleteProducts } from "../handleDeleteProducts/handleDeleteProducts";

interface StockTableProps {
  products: IProduct[];
  onProductUpdated: () => void;
  onDelete: (id: string) => void
}

export default function StockTable({
  products,
  onProductUpdated,
  onDelete
}: StockTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<IProduct | null>(null);
  
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const handleUpdateProduct = (product: IProduct) => {
    if (!isAdmin) return;
    setProductToUpdate(product);
    setIsModalOpen(true);
  };

  const handleSaveUpdatedProduct = async () => {
    await onProductUpdated();
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
                <td className="px-4 py-2 border-table">
                  {product.code || "N/A"}
                </td>
                <td className="px-4 py-2 border-table">{product.name}</td>
                <td className="px-4 py-2 border-table">
                  {product.category || "N/A"}
                </td>
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
                        onClick={() => handleDeleteProducts(product._id, async (id) => onDelete(id))}
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

      <div className="sm:hidden flex flex-col gap-4 mt-4">
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
            <div key={product._id} className="border p-3 rounded-md shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleUpdateProduct(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm font-semibold rounded-full cursor-pointer"
                    >
                      Atualizar
                    </button>
                    <button
                      onClick={() => handleDeleteProducts(product._id, async (id) => onDelete(id))}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm font-semibold rounded-full cursor-pointer"
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Código: {product.code || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Categoria: {product.category || "N/A"}
              </p>
              <p className="text-sm text-gray-500">Quantidade: {quantity}</p>
              <p className="text-sm text-gray-500">
                Estoque Mínimo: {minStock}
              </p>
              <p
                className={`inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-md ${statusColor}`}
              >
                {statusText}
              </p>
            </div>
          );
        })}
      </div>

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
