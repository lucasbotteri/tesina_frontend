import Api from '@/api/Axios';
import Semantic from '@/model/Semantic';
import constants from '@/constants';


/**
 * Returns list of notions or behavioural responses from a specific symbol
 * 
 */
export async function getFromSymbol(lelSymbolId: string, type: string): Promise<Semantic[]> {
    const response = await Api.getInstance().get(`/${constants.SEMANTIC_ENDPOINT_TYPE.get(type)}`, {params: {symbolId: lelSymbolId}});
    const data = response.data;
    return data.map((d: any) => new Semantic(d.id, d.name, type, d.description, d.createdAt, d.updatedAt));
}


export default {
    getFromSymbol,
};
