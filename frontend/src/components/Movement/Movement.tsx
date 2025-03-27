"use client";

import { useState } from "react";
import Form from "./components/Form";
import { useStockMovement } from "@/hooks/useCreateMovement";
import { useAuth } from "@/hooks/useAuth";
import { IMovement } from "@/interfaces/IMovement";

export default function Movement() {
    const { createMovement, message, isLoading } = useStockMovement();
    const { user } = useAuth();

    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [movementType, setMovementType] = useState<"entrada" | "saida">("entrada");
    const [movementQuantity, setMovementQuantity] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const handleRegisterMovement = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            console.error("Usuário não autenticado");
            return;
        }

        const newMovement: IMovement = {
            product,
            movementQuantity: quantity,
            unitPrice,
            totalPrice: unitPrice * quantity,
            type: movementType as "entrada" | "saida",
            createdBy: user ? {
                _id: user._id,
                name: user.name,
                email: user.email
            } : {
                _id: "",
                name: "Desconhecido",
                email: ""
            },
            date: new Date().toISOString(),
            _id: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await createMovement(newMovement);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 user-form">
            <div className="flex flex-col w-full max-w-lg md:max-w-2xl p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-black text-center text-lg sm:text-xl font-semibold mb-4">
                    Registrar Movimentação de Estoque
                </h2>
                {message && (
                    <div
                        className={`text-center p-2 mb-3 rounded ${
                            message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                    >
                        {message.text}
                    </div>
                )}
                <Form
                    handleRegisterMovement={handleRegisterMovement}
                    product={product}
                    setProduct={setProduct}
                    movementQuantity={movementQuantity}
                    setMovementQuantity={setMovementQuantity}
                    unitPrice={unitPrice}
                    setUnitPrice={setUnitPrice}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    movementType={movementType}
                    setMovementType={setMovementType}
                    date={date}
                    setDate={setDate}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}