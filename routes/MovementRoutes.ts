import express from "express";

import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";
import { createMovement, deleteMovement, getMovements, updateMovement } from "../controllers/MovementController";

const router = express.Router();

router.post("/createMovement", authGuard, validate, createMovement);
router.put("/:id", authGuard, validate, updateMovement);
router.delete("/:id", authGuard, deleteMovement);
router.get("/", authGuard, getMovements);

export default router