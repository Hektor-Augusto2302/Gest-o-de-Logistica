import express from "express";

import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";
import { createSale, getSales, getSaleById, deleteSale } from "../controllers/SaleController";

const router = express.Router();

router.post("/create", authGuard, validate, createSale);

export default router