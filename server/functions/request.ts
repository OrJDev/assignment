import axios from 'axios'
import { IGender, INation } from '../types/Api';
import { IContent } from '../types/Content';
import * as content from "./content";
import _ from 'lodash';

export async function getGenderDetails(name: string): Promise<IContent<IGender>> {
    try {
        let resp = await axios(`https://api.genderize.io/?name=${name}`);
        let res: IGender & { count: number; name: string } =
            { ...resp.data, probability: resp.data.probability.toFixed(2) };
        return content.createContent<IGender>(_.omit(res, ['count', 'name']))
    } catch (e) {
        return content.createErr<IGender>(e)
    }
}

export async function getNationDetails(name: string): Promise<IContent<INation>> {
    try {
        let resp = await axios(`https://api.nationalize.io/?name=${name}`);
        let { country } = resp.data
        if (Array.isArray(country)) {
            country = country.reduce((acc, curr) => {
                if (curr.probability > acc.probability) return curr;
                return acc;
            })
        }
        let res: INation & { name: string } =
        {
            ...resp.data,
            country: {
                ...country,
                probability: country.probability.toFixed(2)
            }
        };
        return content.createContent<INation>(_.omit(res, ['name']))
    } catch (e) {
        return content.createErr<INation>(e)
    }
}



type IResp = { nation: INation; gender: IGender; }
export async function getDetails(name: string): Promise<IContent<IResp>> {
    try {
        let nationCtx = await getNationDetails(name);
        if (nationCtx.error) {
            return nationCtx as any
        }
        let genderCtx = await getGenderDetails(name);
        if (genderCtx.error) {
            return genderCtx as any;
        }
        return content.createContent<IResp>({ nation: nationCtx.data, gender: genderCtx.data })
    } catch (e) {
        return content.createErr<IResp>(e)
    }
}
