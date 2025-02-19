import express from "express";

import { login, registerAdminUser, registerUser } from "../controllers/UserController";

import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";

const router = express.Router();

router.post("/register/user", validate, registerUser);
router.post("/register/admin", authGuard, registerAdminUser);
router.post("/login", validate, login);

export default router