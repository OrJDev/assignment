import axios from 'axios'
import { IGender, INation } from '../types/Api';
import { IContent } from '../types/Content';
import * as content from "./content";
import _ from 'lodash';
import { fixGender, fixNation } from './utils';

export async function getGenderDetails(name: string): Promise<IContent<IGender>> {
    try {
        let resp = fixGender(await axios(`https://api.genderize.io/?name=${name}`));
        return content.createContent<IGender>(resp);
    } catch (e) {
        return content.createErr<IGender>(e)
    }
}

export async function getNationDetails(name: string): Promise<IContent<INation>> {
    try {
        let resp = fixNation(await axios(`https://api.nationalize.io/?name=${name}`));
        return content.createContent<INation>(resp)
    } catch (e) {
        return content.createErr<INation>(e)
    }
}



type IResp = {
    nation: INation;
    gender: IGender;
}
export async function getDetails(name: string): Promise<IContent<IResp>> {
    try {
        const [gender, nation] = await Promise.all([
            axios.get(`https://api.genderize.io/?name=${name}`),
            axios.get(`https://api.nationalize.io/?name=${name}`)
        ])
        return content.createContent<IResp>({
            nation: fixNation(nation),
            gender: fixGender(gender)
        })
    } catch (e) {
        return content.createErr<IResp>(e)
    }
}
