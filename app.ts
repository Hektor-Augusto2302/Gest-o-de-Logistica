import express from "express";
import router from "./routes/Router";
import conn from "./config/db";
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

conn();

app.use(router);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
