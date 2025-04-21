// src/components/dashboard/DashboardCards.tsx
"use client";

import Image from "next/image";
import Money from "../../../public/money.svg";

interface DashboardCardsProps {
  totalSold: number;
  totalStock: number;
  totalStockValue: number;
}

export default function DashboardCards({
  totalSold,
  totalStock,
  totalStockValue,
}: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full">
      <div className="bg-white rounded-lg shadow p-4 w-full sm:max-w-xs max-w-[15rem]">
        <h2 className="text-black-600 dark:text-black-300 text-sm text-center">
          Produtos Vendidos
        </h2>
        <div className="flex gap-4 justify-center items-center">
          <Image src={Money} alt="Ilustração de dinheiro" />
          <p className="text-2xl font-bold text-blue-500">
            +{" "}
            {totalSold.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 w-full sm:max-w-xs max-w-[15rem]">
        <h2 className="text-black-600 dark:text-black-300 text-sm text-center">
          Em Estoque (Qtde)
        </h2>
        <div className="flex gap-4 justify-center items-center">
          <Image src={Money} alt="Ilustração de dinheiro" />
          <p className="text-2xl font-bold text-green-500">
            +{" "}
            {totalStock.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 w-full sm:max-w-xs max-w-[15rem]">
        <h2 className="text-black-600 dark:text-black-300 text-sm text-center">
          Valor Total do Estoque
        </h2>
        <div className="flex gap-4 justify-center items-center">
          <Image src={Money} alt="Ilustração de dinheiro" />
          <p className="text-2xl font-bold text-yellow-500">
            R$ {totalStockValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}