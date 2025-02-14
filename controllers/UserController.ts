import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserRequestBody } from '../interfaces/IUserRequestBody';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret: string = process.env.JWT_SECRET || ''; 

if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

console.log(`JWT Secret: ${jwtSecret}`);

const generateToken = (id: string): string => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

const registerUser = async (req: Request<{}, {}, IUserRequestBody>, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(422).json({ errors: ['Este email já está em uso'] });
            return
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: newUser._id,
            token: generateToken(newUser._id.toString()),
            message: "Usuario cadastrado com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// const registerAdmin = async (req: Request<{}, {}, IUserRequestBody>, res: Response): Promise<void> => {
//     try {

//         if (req.user.role !== 'admin') {
//             return res.status(403).json({ error: 'Apenas administradores podem criar novos usuários administradores' });
//         }

//         const { name, email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (user) {
//             res.status(422).json({ errors: ['Este email já está em uso'] });
//             return
//         }

//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = await User.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         res.status(201).json({
//             _id: newUser._id,
//             token: generateToken(newUser._id.toString()),
//             message: "Usuario cadastrado com sucesso!"
//         });
//     } catch (error) {
//         console.error('Erro ao registrar usuário:', error);
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }
// };

export { registerUser, generateToken };
