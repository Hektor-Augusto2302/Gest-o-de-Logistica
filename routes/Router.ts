import { Router, Request, Response } from "express";
import userRoutes from "./UserRoutes";
import productRoutes from "./ProductRoutes"
import movementRoutes from "./MovementRoutes"

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/product", productRoutes);
router.use("/api/movement", movementRoutes);

router.get("/", (req: Request, res: Response) => {
    res.send("API, Working");
});

export default router;
