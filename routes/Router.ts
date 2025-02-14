import { Router, Request, Response } from "express";
import userRoutes from "./UserRoutes";

const router = Router();

router.use("/api/users", userRoutes); 

router.get("/", (req: Request, res: Response) => {
    res.send("API, Working");
});

export default router;
