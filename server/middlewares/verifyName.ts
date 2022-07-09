import { NextFunction, Response, Request } from 'express';
import * as content from "../functions/content";

export default async function verifyName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;
    if (!name) {
        let c = content.error("Name is required");
        res.status(400).json(c)
    }
    return next();
}