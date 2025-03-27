import { useState } from "react";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { IMovement } from "@/interfaces/IMovement";

export const useStockMovement = () => {
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createMovement = async (movementData: IMovement) => {
        setMessage(null);
        setIsLoading(true);

        if (!movementData.unitPrice || !movementData.totalPrice) {
            setMessage({ text: "Os campos de preço unitário e total são obrigatórios.", type: "error" });
            setIsLoading(false);
            return;
        }

        try {
            await api.post<{ movement: IMovement }>("/api/movement/createMovement", {
                ...movementData,
                product: movementData.product,
                unitPrice: movementData.unitPrice,
                totalPrice: movementData.totalPrice,
            });

            setMessage({ text: "Movimentação registrada com sucesso!", type: "success" });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setMessage({ text: error.response?.data?.error || "Erro ao registrar movimentação", type: "error" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { createMovement, isLoading, message };
};