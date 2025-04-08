import { useCallback, useState } from "react";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { IMovement, IMovementRequest } from "@/interfaces/IMovement";

export const useStockMovement = () => {
    const [movements, setMovements] = useState<IMovement[]>([]);
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

    const getMovements = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await api.get("/api/movement");
            setMovements(response.data);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.error || "Erro ao obter movimentações";
                setMessage({ text: errorMessage, type: "error" });
            } else {
                setMessage({ text: "Erro desconhecido ao obter movimentações", type: "error" });
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { createMovement, getMovements, setMovements, movements, isLoading, message };
};