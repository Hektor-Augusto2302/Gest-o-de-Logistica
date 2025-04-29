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
  const filteredProducts = products.filter(
    (product) =>
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
                  onChange={(e) =>
                    handleInputChange(product._id, Number(e.target.value))
                  }
                  min={0}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-4 sm:hidden mt-5">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-md shadow-md bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {product.name}
              </h3>
              <span className="text-sm text-gray-500">
                Código: {product.code}
              </span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>Categoria:</strong> {product.category || "N/A"}
              </p>
              <p>
                <strong>Quantidade Atual:</strong> {product.quantity ?? 0}
              </p>
            </div>

            <div className="mt-3">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor={`counted-${product._id}`}
              >
                Quantidade Contada
              </label>
              <input
                id={`counted-${product._id}`}
                type="number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={countedQuantities[product._id] || ""}
                onChange={(e) =>
                  handleInputChange(product._id, Number(e.target.value))
                }
                min={0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
