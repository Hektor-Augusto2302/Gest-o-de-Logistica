import { User } from "@/interfaces/IUser";
import api from "@/utils/api";
import { AxiosError } from "axios";
import { useState } from "react";

export const useUpdateUser = () => {
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const updateUser = async (id: string, formData: FormData) => {
        setMessage(null);
        setIsUpdating(true);

        try {
            const response = await api.put<User>(`/api/users/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage({ text: "Perfil atualizado com sucesso!", type: "success" });
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.errors || "Erro ao atualizar o perfil";
                setMessage({ text: errorMessage, type: "error" });
            } else {
                setMessage({ text: "Erro desconhecido ao atualizar o perfil", type: "error" });
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateUser, isUpdating, message };
};