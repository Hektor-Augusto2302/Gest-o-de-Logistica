import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next(); // Passa para o próximo middleware ou a função de rota
    }

    // Extrair erros e enviá-los como uma resposta JSON
    const extractedErrors: string[] = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    res.status(422).json({
        errors: extractedErrors,
    });
};

export default validate;