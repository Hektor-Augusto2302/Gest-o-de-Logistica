export interface IMovementRequest {
    product: string;
    movementQuantity: number;
    type: "entrada" | "saida";
}