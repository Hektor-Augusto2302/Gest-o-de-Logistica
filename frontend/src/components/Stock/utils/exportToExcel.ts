import * as XLSX from "xlsx";
import { IProduct } from "@/types/IProduct";
import { getStockStatus } from "./getStockStatus";

export function exportProductsToExcel(products: IProduct[]) {
  const data = products.map((product) => ({
    Código: product.code || "N/A",
    Produto: product.name,
    Categoria: product.category || "N/A",
    Quantidade: product.quantity ?? 0,
    Estoque_Mínimo: product.minStock ?? 0,
    Status: getStockStatus(product.quantity ?? 0, product.minStock ?? 0),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Produtos");

  XLSX.writeFile(workbook, "estoque.xlsx");
}