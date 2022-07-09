import { IAdditional, IContent } from "../types/Content";

const DEFAULT_ERR = 'An error has occurred';

export function error<T = any>(message: any, additional?: IAdditional, data?: T): IContent<T> {
    return {
        data: (data ?? {}) as T,
        error: {
            message: message ? formatError(message) : DEFAULT_ERR,
            additional: additional ?? {},
        },
        success: false
    }
}

export const createErr = error;

export function content<T>(data: T): IContent<T> {
    return {
        data,
        error: null,
        success: true
    }
}

export const createContent = content;

export function formatError(error: any): any {
    if (typeof error === 'object') {
        if (Array.isArray(error)) return DEFAULT_ERR;
        else {
            if (error.hasOwnProperty('message')) {
                return formatError(error.message)
            } else if (error.hasOwnProperty('stack')) {
                return formatError(error.stack)
            }
            else return DEFAULT_ERR;
        }
    } else {
        return error;
    }
}