import { Request, Response } from "express";
import Movement from "../models/Movement";
import Product from "../models/Product";
import { AuthenticatedRequest } from "../interfaces/AuthenticatedRequest";

const createMovement = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Usuário não autenticado" });
            return;
        }

        const { product, movementQuantity, type } = req.body;

        const existingProduct = await Product.findOne({ 
            $or: [{ code: product }, { name: product }]
        });

        if (!existingProduct) {
            res.status(404).json({ error: "Produto não encontrado" });
            return;
        }

        if (type === "saida" && existingProduct.quantity < movementQuantity) {
            res.status(400).json({ error: "Estoque insuficiente para a saída solicitada" });
            return;
        }

        const movement = new Movement({
            product: existingProduct._id,
            movementQuantity,
            type,
            createdBy: req.user._id
        });

        await movement.save();

        if (type === "entrada") {
            existingProduct.quantity += movementQuantity;
        } else {
            existingProduct.quantity -= movementQuantity;
        }

        await existingProduct.save();

        res.status(201).json({ message: "Movimentação registrada com sucesso!", movement });
    } catch (error) {
        console.error("Erro ao registrar movimentação:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const updateMovement = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Usuário não autenticado" });
            return;
        }

        const { id } = req.params;
        const { movementQuantity, type } = req.body;

        const movement = await Movement.findById(id);
        if (!movement) {
            res.status(404).json({ error: "Movimentação não encontrada" });
            return;
        }

        const product = await Product.findById(movement.product);
        if (!product) {
            res.status(404).json({ error: "Produto associado à movimentação não encontrado" });
            return;
        }

        if (movement.type === "entrada") {
            product.quantity -= movement.movementQuantity;
        } else {
            product.quantity += movement.movementQuantity;
        }

        if (type === "saida" && product.quantity < movementQuantity) {
            res.status(400).json({ error: "Estoque insuficiente para a saída solicitada" });
            return;
        }

        movement.movementQuantity = movementQuantity;
        movement.type = type;

        if (type === "entrada") {
            product.quantity += movementQuantity;
        } else {
            product.quantity -= movementQuantity;
        }

        await movement.save();
        await product.save();

        res.status(200).json({ message: "Movimentação atualizada com sucesso!", movement });
    } catch (error) {
        console.error("Erro ao atualizar movimentação:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

const getMovements = async (req: Request, res: Response): Promise<void> => {
    try {
        const movements = await Movement.find()
            .populate("product", "name code")
            .populate("createdBy", "name email")
            .select("product movementQuantity type date createdBy");

        res.status(200).json(movements);
    } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export { createMovement, updateMovement, getMovements };