import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';

import User from '../models/User';
import { IUserRequestBody } from '../interfaces/IUserRequestBody';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { IUser } from '../interfaces/IUser';

import dotenv from 'dotenv';

dotenv.config();

const jwtSecret: string | undefined = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('JWT_SECRET não está definido no arquivo .env');
}

const generateToken = (id: string): string => {
    return jwt.sign({ id }, jwtSecret as string, { expiresIn: "7d" });
};

const registerUser = async (req: Request<{}, {}, IUserRequestBody>, res: Response): Promise<void> => {
    try {
        let { name, email, password } = req.body;

        name = name.trim();
        email = email.trim();
        password = password.trim();

        const user = await User.findOne({ email });
        if (user) {
            res.status(422).json({ errors: ['Este email já está em uso'] });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: HydratedDocument<IUser> = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id.toString(),
            token: generateToken(newUser._id.toString()),
            message: "Usuário cadastrado com sucesso!",
        });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const registerAdminUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ error: 'Apenas administradores podem criar novos administradores' });
            return;
        }

        let { name, email, password } = req.body;

        name = name.trim();
        email = email.trim();
        password = password.trim();

        const userAdmin = await User.findOne({ email });
        if (userAdmin) {
            res.status(422).json({ error: 'Este email já está em uso' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdminUser: HydratedDocument<IUser> = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
        });

        await newAdminUser.save();

        res.status(201).json({
            _id: newAdminUser._id.toString(),
            token: generateToken(newAdminUser._id.toString()),
            message: "Usuário administrador cadastrado com sucesso!",
        });
    } catch (error) {
        console.error('Erro ao registrar usuário administrador:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(422).json({ error: 'Credenciais inválidas' });
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(422).json({ error: 'Credenciais inválidas' });
            return
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            message: "Login realizado com sucesso!"
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export { generateToken, registerUser, registerAdminUser, login };
