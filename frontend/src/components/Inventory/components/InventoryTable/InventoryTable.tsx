"use client";

import { IProduct } from "@/types/IProduct";

interface InventoryTableProps {
  products: IProduct[];
  isLoading: boolean;
  message: { text: string; type: "success" | "error" } | null;
  searchTerm: string;
  countedQuantities: Record<string, number>;
  handleInputChange: (productId: string, value: number) => void;
}

export default function InventoryTable({
  products,
  isLoading,
  message,
  searchTerm,
  countedQuantities,
  handleInputChange,
}: InventoryTableProps) {

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center mt-10">Carregando produtos...</div>;
  }

  if (message && message.type === "error") {
    return <div className="text-center text-red-500 mt-10">{message.text}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-max w-full border-collapse hidden sm:table">
        <thead>
          <tr className="text-center border-collapse">
            <th className="px-4 py-2 border-table">Código</th>
            <th className="px-4 py-2 border-table">Nome</th>
            <th className="px-4 py-2 border-table">Categoria</th>
            <th className="px-4 py-2 border-table">Quantidade Atual</th>
            <th className="px-4 py-2 border-table">Quantidade Contada</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="text-center border-collapse">
              <td className="px-4 py-2 border-table">{product.code}</td>
              <td className="px-4 py-2 border-table">{product.name}</td>
              <td className="px-4 py-2 border-table">{product.category}</td>
              <td className="px-4 py-2 border-table">{product.quantity}</td>
              <td className="px-4 py-2 border-table">
                <input
                  type="number"
                  className="w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                  value={countedQuantities[product._id] || ""}
                  onChange={(e) => handleInputChange(product._id, Number(e.target.value))}
                  min={0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}