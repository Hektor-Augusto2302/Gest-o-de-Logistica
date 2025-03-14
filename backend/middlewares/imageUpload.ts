import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

const imageStorage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        let folder = "";

        if (req.baseUrl.includes("users")) {
            folder = "users";
        }

        cb(null, `uploads/${folder}/`);
    },

    filename: (req: Request, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

export const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req: Request, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas imagens PNG ou JPG."));
        }

        cb(null, true);
    },
});
