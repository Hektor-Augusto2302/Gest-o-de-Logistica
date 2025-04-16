import { useState } from "react";
import { AxiosError } from "axios";
import api from "@/utils/api";
import { IProduct } from "@/interfaces/IProduct";

export const useDeleteProduct = (setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      await api.delete(`/api/product/${id}`);

      setProducts((prev) => prev.filter((product) => product._id !== id));

      setMessage({ text: "Produto excluído com sucesso!", type: "success" });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      if (error instanceof AxiosError) {
        setMessage({
          text: error.response?.data?.error || "Erro ao excluir produto",
          type: "error",
        });
      } else {
        setMessage({
          text: "Erro desconhecido ao excluir produto",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProduct, isLoading, message, setProducts };
};
