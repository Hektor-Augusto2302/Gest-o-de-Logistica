export interface IMovement {
    _id: string;
    product: { _id: string; name: string; code: string }; // 👀 Se product for um objeto
    movementQuantity: number;
    type: "entrada" | "saida";
}

export interface IMovementRequest {
    product: string;
    movementQuantity: number;
    type: "entrada" | "saida";
}