import express from "express";

import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/ProductController";

const router = express.Router();

router.post("/create", authGuard, validate, createProduct);
router.patch("/:id", authGuard, validate, updateProduct);
router.delete("/:id", authGuard, deleteProduct);
router.get("/", authGuard, getProducts);

export default router