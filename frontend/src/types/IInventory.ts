export interface IInventoryProduct {
    productId: string;
    countedQuantity: number;
  }
  
  export interface IInventory {
    _id: string;
    products: IInventoryProduct[];
    performedBy: string;
    createdAt: string;
  }
  
  export interface IInventoryRequest {
    products: IInventoryProduct[];
  }
  