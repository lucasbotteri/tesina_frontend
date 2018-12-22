import Api from '@/api/Axios';
import Semantic from '@/model/Semantic';
import constants from '@/constants';


/**
 * Returns list of notions or behavioural responses from a specific symbol
 * 
 */
export async function getFromSymbol(lelSymbolId: string, type: string): Promise<Semantic[]> {
    const response = await Api.getInstance().get(`/${constants.SEMANTIC_ENDPOINT_TYPE.get(type)}`, { params: { symbolId: lelSymbolId } });
    const data = response.data;
    return data.map((d: any) => new Semantic(d.id, type, d.description, d.createdAt, d.updatedAt));
}

export async function save(semantic: Semantic, lelSymbolId: string): Promise<Semantic> {
    const response = await Api.getInstance().post(`/${constants.SEMANTIC_ENDPOINT_TYPE.get(semantic.type)}`, {
        description: semantic.description,
        symbolId: lelSymbolId,
    });
    const data = response.data;
    return new Semantic(data.id, data.description, semantic.type, data.createdAt, data.updatedAt);
}


export default {
    getFromSymbol,
    save,
};
