import { useState } from "react";
import { AxiosError } from "axios";
import { IProduct } from "@/types/IProduct";
import api from "@/utils/api";

export function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (id: string, data: Partial<IProduct>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/api/product/${id}`, data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "Erro ao atualizar produto");
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
}
