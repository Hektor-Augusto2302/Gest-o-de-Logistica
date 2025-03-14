import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
let isFirstRun = true;

const conn = async (): Promise<typeof mongoose> => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.oegks.mongodb.net/`
        );

        if (isFirstRun) {
            console.log("Conectou ao mongoose");
            isFirstRun = false;
        }

        return dbConn;
    } catch (error) {
        console.log("Erro na conexão com o banco:", error);
        throw error;
    }
};

conn();

export default conn;
