export interface IMovement {
    _id: string;
    product: string;
    movementQuantity: number;
    type: "entrada" | "saida";
    unitPrice: number;
    totalPrice: number;
    date: string;
    createdBy: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}