// middleware/authGuard.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';

const jwtSecret: string = process.env.JWT_SECRET || '';

const authGuard = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(422).json({ errors: ["Acesso negado"] });
        return;
    }

    try {
        const verified = jwt.verify(token, jwtSecret);

        if (typeof verified === 'object' && verified !== null && 'id' in verified) {
            const user = await User.findById(verified.id).select("-password");

            if (!user) {
                res.status(404).json({ errors: ["Usuário não encontrado"] });
                return;
            }

            req.user = { _id: user._id.toString(), role: user.role };
            next();
        } else {
            res.status(401).json({ errors: ["Token inválido"] });
        }
    } catch (error) {
        res.status(401).json({ errors: ["Token inválido"] });
    }

};

export default authGuard;
