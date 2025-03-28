import { useState } from "react";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { IMovementRequest } from "@/interfaces/IMovement";

export const useStockMovement = () => {
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createMovement = async (movementData: IMovementRequest) => {
        setMessage(null);
        setIsLoading(true);

        try {
            await api.post("/api/movement/createMovement", movementData);

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