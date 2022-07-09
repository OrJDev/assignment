import { AxiosResponse } from "axios";
import { IGender, INation } from "../types/Api";
import _ from 'lodash';

export function fixNation(resp: AxiosResponse): INation {
    let { country } = resp.data
    if (Array.isArray(country)) {
        if (country.length > 0) {
            country = country.reduce((acc, curr) => {
                if (curr.probability > acc.probability) return curr;
                return acc;
            }, { country_id: '', probability: 0 })
        } else {
            country = { country_id: '??', probability: 0 }
        }
    }
    let res: INation & { name: string } =
    {
        ...resp.data,
        country: {
            ...country,
            probability: parseFloat(country.probability.toFixed(2))
        }
    };
    return _.omit(res, ['name']);
}


export function fixGender(resp: AxiosResponse): IGender {
    let res: IGender & { count: number; name: string } =
    {
        ...resp.data,
        probability: parseFloat(resp.data.probability.toFixed(2))
    };
    return _.omit(res, ['count', 'name'])
}