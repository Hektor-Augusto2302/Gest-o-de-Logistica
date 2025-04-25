export interface CreateInventoryBody {
    products: {
      productId: string;
      countedQuantity: number;
    }[];
  }