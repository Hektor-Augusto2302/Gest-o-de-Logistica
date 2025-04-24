import express from "express";
import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";
import { createInventory } from "../controllers/InventoryController";

const router = express.Router();

router.post("/createInventory", authGuard, validate, createInventory);

export default router;
