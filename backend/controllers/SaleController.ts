import { Request, Response } from "express";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import Sale from "../models/Sale";
import Product from "../models/Product";

const createSale = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }

    const { products, payment } = req.body;

    let totalAmount = 0;
    const saleItems = [];

    for (const item of products) {
      let product;

      if (mongoose.Types.ObjectId.isValid(item.product)) {
        product = await Product.findOne({
          $or: [
            { _id: item.product },
            { code: item.product },
            { name: item.product },
          ],
        });
      } else {
        product = await Product.findOne({
          $or: [{ code: item.product }, { name: item.product }],
        });
      }

      if (!product) {
        res
          .status(404)
          .json({ error: `Produto não encontrado: ${item.product}` });
        return;
      }

      if (product.quantity < item.quantity) {
        res.status(400).json({
          error: `Estoque insuficiente para o produto ${product.name}`,
        });
        return;
      }

      const unitPrice = product.salePrice;
      const subtotal = unitPrice * item.quantity;
      totalAmount += subtotal;

      saleItems.push({
        product: product._id,
        quantity: item.quantity,
        unitPrice,
      });

      product.quantity -= item.quantity;
      await product.save();
    }

    const change = payment.received - totalAmount;

    const sale = new Sale({
      products: saleItems,
      totalAmount,
      payment: {
        method: payment.method,
        received: payment.received,
        change: change >= 0 ? change : 0,
      },
      user: req.user._id,
      createdAt: new Date(),
    });

    await sale.save();

    res.status(201).json({ message: "Venda registrada com sucesso!", sale });
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getSales = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sales = await Sale.find()
      .populate("products.product", "name code salePrice")
      .populate("user", "name email");

    res.status(200).json(sales);
  } catch (error) {
    console.error("Erro ao listar vendas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getSaleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const sale = await Sale.findById(id)
      .populate("products.product", "name code salePrice")
      .populate("user", "name email");

    if (!sale) {
      res.status(404).json({ error: "Venda não encontrada" });
      return;
    }

    res.status(200).json(sale);
  } catch (error) {
    console.error("Erro ao buscar venda:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const deleteSale = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const sale = await Sale.findById(id);
    if (!sale) {
      res.status(404).json({ error: "Venda não encontrada" });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: "Usuário não autenticado" });
      return;
    }

    if (
      req.user.role !== "admin" &&
      sale.user?.toString() !== req.user._id.toString()
    ) {
      res
        .status(403)
        .json({ error: "Você não tem permissão para excluir esta venda" });
      return;
    }

    for (const item of sale.products) {
      const product = await Product.findById(item.product);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    await sale.deleteOne();

    res
      .status(200)
      .json({ message: "Venda cancelada e estoque restaurado com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir venda:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export { createSale, getSales, getSaleById, deleteSale };
