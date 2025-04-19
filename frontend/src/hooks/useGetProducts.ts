import { IProduct } from "@/types/IProduct";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { useState, useCallback } from "react";

export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    const getProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/api/product");
            setProducts(response.data);
            setIsLoading(false);
        } catch (error: unknown) {
            setIsLoading(false);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.errors || "Erro desconhecido ao obter os produtos";
                setMessage({ text: errorMessage, type: "error" });
            } else {
                setMessage({ text: "Erro desconhecido ao obter os produtos", type: "error" });
            }
        }
    }, []);

    return { products, getProducts, isLoading, message };
};