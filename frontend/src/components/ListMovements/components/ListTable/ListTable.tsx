"use client";

import { IMovement } from "@/interfaces/IMovement";
import { handleDeleteOne } from "../handleDeleteOne/handleDeleteOne";

interface ListTableProps {
  movements: IMovement[];
  onDelete: (id: string) => void;
}

export default function ListTable({
  movements,
  onDelete,
}: ListTableProps) {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-max w-full border-collapse hidden sm:table">
        <thead>
          <tr className="text-center border-collapse">
            <th className="px-4 py-2 border-table">Produto</th>
            <th className="px-4 py-2 border-table">Código</th>
            <th className="px-4 py-2 border-table">Quantidade</th>
            <th className="px-4 py-2 border-table">Tipo</th>
            <th className="px-4 py-2 border-table">Preço Unitário</th>
            <th className="px-4 py-2 border-table">Preço Total</th>
            <th className="px-4 py-2 border-table">Criado por</th>
            <th className="px-4 py-2 border-table">Data</th>
            <th className="px-4 py-2 border-table">Ações</th>
          </tr>
        </thead>
        <tbody>
          {movements
            .filter((m) => m.product)
            .map((m) => (
              <tr key={m._id} className="text-center border-b">
                <td className="px-4 py-2 border-table">
                  {m.product?.name || "-"}
                </td>
                <td className="px-4 py-2 border-table">
                  {m.product?.code || "-"}
                </td>
                <td className="px-4 py-2 border-table">{m.movementQuantity}</td>
                <td className="px-4 py-2 border-table">{m.type}</td>
                <td className="px-4 py-2 border-table">
                  R$ {m.unitPrice.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-table">
                  R$ {m.totalPrice.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-table">{m.createdBy.name}</td>
                <td className="px-4 py-2 border-table">
                  {new Date(m.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-table">
                  <button
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
                    onClick={() =>
                      handleDeleteOne(m._id, async (id) => onDelete(id))
                    }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="sm:hidden flex flex-col gap-4 mt-4">
        {movements
          .filter((m) => m.product)
          .map((m) => (
            <div key={m._id} className="border p-3 rounded-md shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {m.product?.name || "Produto deletado"}
                </h3>
              </div>
              <p className="text-sm text-gray-500">
                Código: {m.product?.code || "-"}
              </p>
              <p className="text-sm text-gray-500">
                Quantidade: {m.movementQuantity}
              </p>
              <p className="text-sm text-gray-500">Tipo: {m.type}</p>
              <p className="text-sm text-gray-500">
                Preço Unitário: R$ {m.unitPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Preço Total: R$ {m.totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                Criado por: {m.createdBy.name}
              </p>
              <p className="text-sm text-gray-500">
                Data: {new Date(m.date).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
