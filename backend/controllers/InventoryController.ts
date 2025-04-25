import { Response } from "express";
import Inventory from "../models/Inventory";
import Product from "../models/Product";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { CreateInventoryBody } from "../interfaces/CreateInventoryBody";

const createInventory = async (
  req: AuthenticatedRequest<CreateInventoryBody>,
  res: Response
): Promise<void> => {
  try {
    const { products } = req.body;
    const user = req.user;

    if (!user || user.role !== "admin") {
      res.status(403).json({ message: "Acesso negado. Apenas administradores podem realizar inventário." });
      return;
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: "Lista de produtos é obrigatória" });
      return;
    }

    const resolvedProducts = [];

    for (const { productId, countedQuantity } of products) {
      const product = await Product.findById(productId);

      if (!product) {
        res.status(404).json({ message: `Produto não encontrado: ${productId}` });
        return;
      }

      await Product.findByIdAndUpdate(productId, { quantity: countedQuantity });

      resolvedProducts.push({ productId, countedQuantity });
    }

    const inventory = await Inventory.create({
      products: resolvedProducts,
      performedBy: user._id,
    });

    res.status(201).json({ message: "Inventário registrado com sucesso", inventory });
  } catch (error) {
    console.error("Erro ao criar inventário:", error);
    res.status(500).json({ message: "Erro ao registrar inventário" });
  }
};


export { createInventory };
