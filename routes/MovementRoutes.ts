import express from "express";

import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";
import { createMovement, getMovements } from "../controllers/MovementController";

const router = express.Router();

router.post("/createMovement", authGuard, validate, createMovement);
router.get("/", authGuard, getMovements);

export default router