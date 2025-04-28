"use client";
import { useAuth } from "@/hooks/useAuth";

export default function InventoryTable({}) {

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

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
      </table>
    </div>
  );
}
