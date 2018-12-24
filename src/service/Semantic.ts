import Api from '@/api/Axios';
import Semantic from '@/model/Semantic';
import constants from '@/constants';


/**
 * Returns list of notions or behavioural responses from a specific symbol
 */
export async function getFromSymbol(lelSymbolId: string, type: string): Promise<Semantic[]> {
    const response = await Api.getInstance().get(`/${constants.SEMANTIC_ENDPOINT_TYPE.get(type)}`, { params: { symbolId: lelSymbolId } });
    const data = response.data;
    data
        .forEach((d: any) => {
            d.symbolsReferenced = d.symbolsReferenced
                .map((s: any) => {
                    return { id: s.id, name: s.name };
                });
        });
    return data.map((d: any) => new Semantic(d.id, type, d.description, d.createdAt, d.updatedAt, d.symbolsReferenced));
}

export async function save(semantic: Semantic, lelSymbolId: string): Promise<Semantic> {
    const response = await Api.getInstance().post(`/${constants.SEMANTIC_ENDPOINT_TYPE.get(semantic.type)}`, {
        description: semantic.description,
        symbolId: lelSymbolId,
    });
    const data = response.data;
    data.symbolsReferenced.map((s: any) => Object.create({ id: s.id, name: s.name }));
    return new Semantic(data.id, semantic.type, semantic.description, data.createdAt, data.updatedAt, data.symbolsReferenced);
}


export async function remove(semanticId: string, type: string): Promise<boolean> {
    const response = await Api.getInstance().delete(`/${constants.SEMANTIC_ENDPOINT_TYPE.get(type)}/${semanticId}`);
    const data = response.data;
    return true;
}


export default {
    getFromSymbol,
    save,
    remove,
};
