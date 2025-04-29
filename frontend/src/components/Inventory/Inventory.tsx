"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useInventory } from "@/hooks/useInventory";
import InventoryTable from "./components/InventoryTable/InventoryTable";

export default function Inventory() {
  const { products, getProducts, isLoading, message } = useGetProducts();
  const {
    createInventory,
    isLoading: inventoryLoading,
    message: inventoryMessage,
  } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [countedQuantities, setCountedQuantities] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleInputChange = (productId: string, value: number) => {
    setCountedQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleConcludeInventory = async () => {
    const productsToSend = Object.entries(countedQuantities)
      .filter(([, quantity]) => !isNaN(quantity))
      .map(([productId, countedQuantity]) => ({
        productId,
        countedQuantity,
      }));

    if (productsToSend.length === 0) {
      alert("Nenhuma quantidade contada foi inserida.");
      return;
    }

    await createInventory({ products: productsToSend });

    getProducts();
  };

  return (
    <div className="user-form">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-blue-500 font-semibold">Inventário</h1>
        <button
          onClick={handleConcludeInventory}
          className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-md transition duration-300 cursor-pointer w-48 h-12"
          disabled={inventoryLoading}
        >
          {inventoryLoading ? "Concluindo..." : "Concluir Inventário"}
        </button>
      </div>

      {inventoryMessage && (
        <div
          className={`my-4 text-center font-semibold ${
            inventoryMessage.type === "success"
              ? "bg-green-50 text-green-500"
              : "bg-red-50 text-red-500"
          }`}
        >
          {inventoryMessage.text}
        </div>
      )}

      <hr className="my-5 border-gray-300" />

      <div className="flex justify-between items-center mx-10 mt-5 max-sm:flex-col max-sm:items-start max-sm:gap-3">
        <div className="relative w-full max-sm:w-auto max-[414px]:ml-[-50px]">
          <input
            className="px-3 py-2 pl-10 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="search"
            placeholder="Pesquisa por Nome ou Código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
        </div>
      </div>

      <InventoryTable
        products={products}
        isLoading={isLoading}
        message={message}
        searchTerm={searchTerm}
        countedQuantities={countedQuantities}
        handleInputChange={handleInputChange}
      />

      <hr className="my-5 border-gray-300" />
    </div>
  );
}
