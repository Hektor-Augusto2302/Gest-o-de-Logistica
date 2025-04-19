// src/components/dashboard/DashboardCards.tsx
"use client";

import Image from "next/image";
import Money from "../../../public/money.svg";

interface DashboardCardsProps {
  totalVendidos: number;
  totalEstoque: number;
  valorTotalEstoque: number;
}

export default function DashboardCards({
  totalVendidos,
  totalEstoque,
  valorTotalEstoque,
}: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-black-600 dark:text-black-300 text-sm text-center">
          Produtos Vendidos
        </h2>
        <div className="flex gap-4 justify-center items-center">
          <Image src={Money} alt="Ilustração de dinheiro" />
          <p className="text-2xl font-bold text-blue-500">
            +{" "}
            {totalVendidos.toLocaleString("pt-BR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-black-600 dark:text-black-300 text-sm text-center">
          Em Estoque (Qtde)
        </h2>
        <div className="flex gap-4 justify-center items-center">
          <Image src={Money} alt="Ilustração de dinheiro" />
          <p className="text-2xl font-bold text-green-500">
            +{" "}
            {totalEstoque.toLocaleString("pt-BR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-black-600 dark:text-black-300 text-sm text-center">
          Valor Total do Estoque
        </h2>
        <div className="flex gap-4 justify-center items-center">
          <Image src={Money} alt="Ilustração de dinheiro" />
          <p className="text-2xl font-bold text-yellow-500">
            R${" "}
            {valorTotalEstoque.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
