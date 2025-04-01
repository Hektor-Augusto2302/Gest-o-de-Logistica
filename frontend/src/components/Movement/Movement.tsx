"use client";

import { useEffect, useState } from "react";
import Form from "./components/Form";
import { useStockMovement } from "@/hooks/useCreateMovement";
import { useAuth } from "@/hooks/useAuth";
import { IMovementRequest } from "@/interfaces/IMovement";

export default function Movement() {
    const { createMovement, getMovements, message, isLoading,  movements } = useStockMovement();
    const { user } = useAuth();

    const [product, setProduct] = useState("");
    const [movementQuantity, setMovementQuantity] = useState(0);
    const [movementType, setMovementType] = useState<"entrada" | "saida">("entrada");

    useEffect(() => {
        getMovements();
    }, [getMovements]);

    const handleRegisterMovement = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            console.error("Usuário não autenticado");
            return;
        }

        const newMovement: IMovementRequest = {
            product,
            movementQuantity,
            type: movementType,
        };

        await createMovement(newMovement);
        getMovements();
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 user-form">
            <h2>Lista de Movimentações</h2>
            <ul>
                {movements.map((m) => (
                    <li key={m._id}>
                        Produto: {m.product.name} | Quantidade: {m.movementQuantity} | Tipo: {m.type}
                    </li>
                ))}
            </ul>
            <Form
                handleRegisterMovement={handleRegisterMovement}
                product={product}
                setProduct={setProduct}
                movementQuantity={movementQuantity}
                setMovementQuantity={setMovementQuantity}
                movementType={movementType}
                setMovementType={setMovementType}
                message={message}
                isLoading={isLoading}
            />
        </div>
    );
}