import { Router, Request, Response } from "express";
import userRoutes from "./UserRoutes";
import productRoutes from "./ProductRoutes"

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/product", productRoutes);

router.get("/", (req: Request, res: Response) => {
    res.send("API, Working");
});

export default router;
