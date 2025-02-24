import express from "express";

import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";
import { createProduct, getProducts, updateProduct } from "../controllers/ProductController";

const router = express.Router();

router.post("/create", authGuard, validate, createProduct);
router.patch("/:id", authGuard, validate, updateProduct);
router.get("/", authGuard, getProducts);

export default router