import { IAdditional, IContent, IError, IParams } from "../types/Content";

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


export function validateParams(params: IParams) {
    let additional: any = {}
    for (const key in params) {
        // the reason we continue is because we want to add a single error for param, we don't want to have an arry
        let paramater = { ...params[key], value: params[key].value?.toString() };
        if (paramater.required && !paramater.value) {
            additional[key] = `${key} is required`;
            continue;
        }
        if (paramater.regex && !(paramater.regex.test(paramater.value))) {
            additional[key] = `${key} is invalid`;
            continue;
        }
        if (paramater.value) {
            if (paramater.min && paramater.value.length < paramater.min) {
                additional[key] = `${key} must be greater than ${paramater.min}`;
                continue;
            }
            if (paramater.max && paramater.value.length > paramater.max) {
                additional[key] = `${key} must be less than ${paramater.max}`;
                continue;
            }
        }
    }
    if (Object.keys(additional).length > 0) {
        return error('Invalid Params', additional);
    }
    return null;
}

export const IsError = (err: IError | null): err is IError => err !== null && 'message' in err;