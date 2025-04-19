import { useState } from "react";
import { AxiosError } from "axios";
import api from "@/utils/api";
import { IMovement } from "@/types/IMovement";

export function useUpdateMovement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateMovement = async (id: string, data: Partial<IMovement>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/api/movement/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message || "Erro ao atualizar movimentação"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateMovement, loading, error };
}
