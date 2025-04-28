import { useCallback, useState } from "react";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { IInventory, IInventoryRequest } from "@/types/IInventory";

export const useInventory = () => {
  const [inventories, setInventories] = useState<IInventory[]>([]);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createInventory = async (inventoryData: IInventoryRequest) => {
    setMessage(null);
    setIsLoading(true);

    try {
      await api.post("/api/inventory/createInventory", inventoryData);

      setMessage({ text: "Inventário registrado com sucesso!", type: "success" });

      setTimeout(() => {
        router.push("/inventory"); // Redireciona para a página de inventário
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage({ text: error.response?.data?.message || "Erro ao registrar inventário", type: "error" });
      } else {
        setMessage({ text: "Erro desconhecido ao registrar inventário", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getInventories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/api/inventory");
      setInventories(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "Erro ao obter inventários";
        setMessage({ text: errorMessage, type: "error" });
      } else {
        setMessage({ text: "Erro desconhecido ao obter inventários", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createInventory, getInventories, setInventories, inventories, isLoading, message };
};