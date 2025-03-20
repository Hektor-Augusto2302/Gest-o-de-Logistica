export function getStockStatus(quantity: number, minStock: number) {
    if (quantity === 0) {
        return "sem_estoque";
    } else if (quantity <= minStock) {
        return "estoque_baixo";
    } else if (quantity <= minStock * 1.05) {
        return "estoque_medio";
    } else {
        return "estoque_alto";
    }
}