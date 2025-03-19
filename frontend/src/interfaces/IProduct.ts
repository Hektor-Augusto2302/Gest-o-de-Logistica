export interface IProduct {
    _id: string;
    name: string;
    code: string;
    quantity: number;
    description?: string;
    costPrice: number;
    salePrice: number;
    unit: string;
    category: string;
    suppliers?: string[];
    minStock?: number;
    createdBy: string | undefined;
}
