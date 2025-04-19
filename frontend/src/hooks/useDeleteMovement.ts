import { useState } from "react";
import { AxiosError } from "axios";
import api from "@/utils/api";
import { IMovement } from "@/types/IMovement";

export const useDeleteMovement = (setMovements: React.Dispatch<React.SetStateAction<IMovement[]>>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const deleteMovement = async (id: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      await api.delete(`/api/movement/${id}`);

      setMovements((prev) => prev.filter((movement) => movement._id !== id));

      setMessage({ text: "Movimentação excluída com sucesso!", type: "success" });
    } catch (error) {
      console.error("Erro ao excluir movimentação:", error);
      if (error instanceof AxiosError) {
        setMessage({
          text: error.response?.data?.error || "Erro ao excluir movimentação",
          type: "error",
        });
      } else {
        setMessage({
          text: "Erro desconhecido ao excluir movimentação",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMovement, isLoading, message };
};