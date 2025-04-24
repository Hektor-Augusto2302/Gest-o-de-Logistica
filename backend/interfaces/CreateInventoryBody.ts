export interface CreateInventoryBody {
    products: {
      codeOrName: string;
      countedQuantity: number;
    }[];
  }