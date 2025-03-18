"use client";

import { IProduct } from "@/interfaces/IProduct";
import api from "@/utils/api";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export const useRegisterProduct = () => {
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const registerProduct = async (productData: IProduct) => {
        setMessage(null);
        setIsLoading(true);

        if (!productData.name || !productData.code || !productData.costPrice || !productData.salePrice) {
            setMessage({ text: "Todos os campos são obrigatórios!", type: "error" });
            setIsLoading(false);
            return;
        }

        try {
            await api.post("/api/product/create", productData);

            setMessage({ text: "Produto cadastrado com sucesso!", type: "success" });
            router.push("/");

        } catch (error: unknown) {
            setIsLoading(false);
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.errors || "Erro desconhecido ao cadastrar o produto";
                setMessage({ text: errorMessage, type: "error" });
            } else {
                setMessage({ text: "Erro desconhecido ao cadastrar o produto", type: "error" });
            }
        }
    };

    return { registerProduct, isLoading, message };
};