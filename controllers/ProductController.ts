import { Request, Response } from "express";
import Product from "../models/Product";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";
import { Types } from "mongoose";

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
            minStock,
            createdBy: new Types.ObjectId(req.user._id)
        });

        await product.save();
        res.status(201).json({ message: "Produto criado com sucesso!", product });
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor", error });
    }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find()
            .populate("createdBy", "name _id")
            .select("name code quantity description costPrice salePrice unit category suppliers minStock createdBy");

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar produtos", error });
    }
};

export { createProduct, getProducts };