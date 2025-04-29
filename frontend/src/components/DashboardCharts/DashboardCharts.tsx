"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardChartsProps {
  groupedMovements: Record<string, { entrada: number; saida: number }>;
  top3Products: { name: string; quantity: number }[];
  profitByProduct: {
    productName: string;
    totalCost: number;
    totalSale: number;
  }[];
}

const COLORS = ["#6a4c93", "#f39c12", "#1abc9c"]; // Paleta de cores mais vibrante

export default function DashboardCharts({
  groupedMovements,
  top3Products,
  profitByProduct,
}: DashboardChartsProps) {
  const movementData = Object.entries(groupedMovements).map(
    ([date, data]) => ({
      date,
      entrada: data.entrada,
      saida: data.saida,
    })
  );

  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-12">
      {/* Gráfico de Entrada vs Saída de Produtos */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Entrada vs Saída de Produtos
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={movementData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="entrada"
              fill="url(#gradEntrada)"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            />
            <Bar
              dataKey="saida"
              fill="url(#gradSaida)"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            />
            <defs>
              <linearGradient id="gradEntrada" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="gradSaida" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Top 3 Produtos Vendidos */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Top 3 Produtos Vendidos
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={top3Products}
              dataKey="quantity"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {top3Products.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Comparativo de Custo vs Venda */}
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Comparativo de Custo vs Venda
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={profitByProduct}>
            <XAxis dataKey="productName" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="totalCost"
              fill="#ff8042"
              name="Custo Total"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            />
            <Bar
              dataKey="totalSale"
              fill="#00C49F"
              name="Venda Total"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}