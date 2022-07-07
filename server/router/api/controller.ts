import { NextFunction, Request, Response } from "express"
import { nameConfig } from "../../constants/body";
import { validateParams } from "../../functions/content";
import * as API from "../../functions/request";

export const Gender = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    try {
        let paramErrors = validateParams(nameConfig(name));
        if (!paramErrors) {
            let ctx = await API.getGenderDetails(name);
            res.status(ctx.error ? 400 : 200).json(ctx);
        } else {
            res.status(400).json(paramErrors);
        }
    } catch (e) {
        return next(e);
    }
}

export const Nation = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    try {
        let paramErrors = validateParams(nameConfig(name));
        if (!paramErrors) {
            let ctx = await API.getNationDetails(name);
            res.status(ctx.error ? 400 : 200).json(ctx);
        } else {
            res.status(400).json(paramErrors);
        }
    } catch (e) {
        return next(e);
    }
}


export const All = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    try {
        let paramErrors = validateParams(nameConfig(name));
        if (!paramErrors) {
            let ctx = await API.getDetails(name);
            res.status(ctx.error ? 400 : 200).json(ctx);
        } else {
            res.status(400).json(paramErrors);
        }
    } catch (e) {
        return next(e);
    }
}
