export type IAdditional = {
    [key: string]: string
}

export type IError = {
    message: string;
    additional?: IAdditional;
}

export type IContent<T> = {
    data: T;
    error: IError | null;
    success: boolean;
}

export type IParams =
    {
        [key: string]: {
            required?: boolean;
            regex?: RegExp;
            min?: number;
            max?: number;
            value: any;
        }
    }

