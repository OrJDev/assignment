import express, { Application, NextFunction, Request, Response } from "express";
import cors from 'cors';
import ORIGINS from "../constants/origins";
import * as content from '../functions/content';
import router from "../router";

export default function InitApp(app: Application) {
    app.use(express.json());
    app.use(cors({
        optionsSuccessStatus: 200,
        origin: (origin, callback) => {
            if (!origin || ORIGINS.indexOf(origin) === -1) {
                return callback(new Error('Invalid Origin'), false)
            } else {
                return callback(null, true)
            }
        }
    }))
    app.use(router);
    app.use((error: any, _: Request, res: Response, __: NextFunction) => {
        let err = content.error(error);
        res.status(400).json(err);
    });

}