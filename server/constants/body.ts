import { IParams } from "../types/Content";

export const nameConfig = (name: string): IParams => ({
    name: {
        required: true,
        value: name
    }
})