"use client";

import { useEffect, useState } from "react";
import PublicRoute from "@/components/auth/PublicRoute";
import { useAuth } from "@/hooks/useAuth";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useStockMovement } from "@/hooks/useCreateMovement";
import { IMovement } from "@/types/IMovement";
import { IProduct } from "@/types/IProduct";
import DashboardCards from "@/components/DashboardCards/DashboardCards";
import LowStockPanel from "@/components/LowStockPanel/LowStockPanel";
import DashboardCharts from "@/components/DashboardCharts/DashboardCharts";
import { IProfit } from "@/types/IProfit";

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

  const totalSold = movements
    .filter((m: IMovement) => m.type === "saida")
    .reduce((acc: number, m: IMovement) => acc + m.movementQuantity, 0);

  const totalStock = products.reduce((acc, p) => acc + p.quantity, 0);

  const totalStockValue = products.reduce(
    (acc: number, p: IProduct) => acc + p.quantity * p.costPrice,
    0
  );

  const lowStockProducts = products.filter(
    (p: IProduct) => p.quantity < (p.minStock ?? 0)
  );

  const groupedMovements = movements.reduce(
    (acc: Record<string, { entrada: number; saida: number }>, mov) => {
      const date = new Date(mov.date).toLocaleDateString("pt-BR", {
        month: "short",
        year: "numeric",
      });

      if (!acc[date]) acc[date] = { entrada: 0, saida: 0 };

      acc[date][mov.type] += mov.movementQuantity;
      return acc;
    },
    {}
  );

  const productSales = movements
    .filter((m) => m.type === "saida" && m.product)
    .reduce((acc: Record<string, number>, m) => {
      const name = m.product!.name;
      acc[name] = (acc[name] || 0) + m.movementQuantity;
      return acc;
    }, {});

  const top3Products = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, quantity]) => ({ name, quantity }));

  const profitData = movements
    .filter((m) => m.type === "saida" && m.product)
    .reduce((acc: Record<string, IProfit>, m) => {
      const name = m.product!.name;
      const productData = products.find((p) => p._id === m.product!._id);

      const costPrice = productData?.costPrice ?? 0;
      const salePrice = productData?.salePrice ?? 0;

      const existing = acc[name] || {
        productName: name,
        totalCost: 0,
        totalSale: 0,
      };

      existing.totalCost += m.movementQuantity * costPrice;
      existing.totalSale += m.movementQuantity * salePrice;

      acc[name] = existing;
      return acc;
    }, {});

  const profitByProduct = Object.values(profitData);

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
            totalSold={totalSold}
            totalStock={totalStock}
            totalStockValue={totalStockValue}
          />
        )}

        <DashboardCharts
          groupedMovements={groupedMovements}
          top3Products={top3Products}
          profitByProduct={profitByProduct}
        />

        <LowStockPanel products={lowStockProducts} />
      </div>
    </PublicRoute>
  );
}
