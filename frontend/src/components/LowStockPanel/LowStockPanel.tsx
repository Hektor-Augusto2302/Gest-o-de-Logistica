"use client";

import { IProduct } from "@/types/IProduct";

interface LowStockPanelProps {
  products: IProduct[];
}

export default function LowStockPanel({ products }: LowStockPanelProps) {
  if (products.length === 0) return null;

  const shouldScroll = products.length > 4;

  return (
    <div className="mt-10">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div
          className={`${
            shouldScroll ? "max-h-[400px]" : ""
          } overflow-y-auto w-full block`}
        >
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white sticky top-0 z-10 text-black text-center shadow-sm">
              <tr>
                <th className="px-4 py-3">Código</th>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Qtd Atual</th>
                <th className="px-4 py-3">Estoque Mínimo</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 text-center align-middle"
                >
                  <td className="px-4 py-3">{product.code}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 text-red-600 font-semibold">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-3">
                    {product.minStock ?? "Não definido"}
                  </td>
                  <td className="px-4 py-3">
                    <button className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600 transition">
                      Reabastecer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
