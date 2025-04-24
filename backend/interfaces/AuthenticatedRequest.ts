import { Request } from 'express';

export interface AuthenticatedRequest<T = any> extends Request {
    user?: { _id: string; role: string } | null;
    body: T;
}
