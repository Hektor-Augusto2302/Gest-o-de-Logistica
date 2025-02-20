import { Request, Response } from "express";
import Product from "../models/Product";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

const createProduct = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || req.user.role !== "admin") {
            res.status(403).json({ error: "Apenas administradores podem criar produtos" });
            return
        }
        
        const { name, code, quantity, description, costPrice, salePrice, unit, category, suppliers, minStock } = req.body;

        const existingProduct = await Product.findOne({ code });
        if (existingProduct) {
            res.status(400).json({ message: "Produto com este código já existe." });
            return
        }

        const product = new Product({
            name,
            code,
            quantity,
            description,
            costPrice,
            salePrice,
            unit,
            category,
            suppliers,
            minStock
        });

        await product.save();
        res.status(201).json({ message: "Produto criado com sucesso!", product });
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error });
    }
};

export { createProduct };