"use client";

import { useEffect, useState } from "react";
import PublicRoute from "@/components/auth/PublicRoute";
import { useAuth } from "@/hooks/useAuth";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useStockMovement } from "@/hooks/useCreateMovement";
import { IMovement } from "@/interfaces/IMovement";
import { IProduct } from "@/interfaces/IProduct";
import DashboardCards from "@/components/DashboardCards/DashboardCards";

export default function Home() {
  const { user } = useAuth();
  const { products, getProducts } = useGetProducts();
  const { movements, getMovements } = useStockMovement();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([getProducts(), getMovements()]);
      setLoading(false);
    };

    fetchAll();
  }, [getProducts, getMovements]);

  const totalVendidos = movements
    .filter((m: IMovement) => m.type === "saida")
    .reduce((acc: number, m: IMovement) => acc + m.movementQuantity, 0);

  const totalEstoque = products.reduce((acc, p) => acc + p.quantity, 0);

  const valorTotalEstoque = products.reduce(
    (acc: number, p: IProduct) => acc + p.quantity * p.costPrice,
    0
  );

  return (
    <PublicRoute>
      <div className="p-6">
        <h1 className="bg-white w-full max-w-3xl mx-auto py-4 px-6 rounded-lg text-2xl font-bold text-center mb-6 shadow">
          Seja Bem-vinda(o), {user ? user.name : "Visitante"}
        </h1>

        {loading ? (
          <p className="text-center">Carregando dados...</p>
        ) : (
          <DashboardCards
            totalVendidos={totalVendidos}
            totalEstoque={totalEstoque}
            valorTotalEstoque={valorTotalEstoque}
          />
        )}
      </div>
    </PublicRoute>
  );
}
