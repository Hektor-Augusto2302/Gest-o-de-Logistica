export interface IMovement {
    _id: string;
    product: { _id: string; name: string; code: string };
    movementQuantity: number;
    type: "entrada" | "saida";
    unitPrice: number;
    totalPrice: number;
    createdBy: { _id: string; name: string; email: string };
    date: string; // Vamos exibir formatado no componente
}

export interface IMovementRequest {
    product: string;
    movementQuantity: number;
    type: "entrada" | "saida";
}