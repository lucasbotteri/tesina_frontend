import Api from '@/api/Axios';
import Semantic from '@/model/Semantic';


/**
 * Returns list of notions and behavioural responses from a specific symbol
 * 
 */
export async function getFromSymbol(lelSymbolId: string, type: string): Promise<Semantic[]> {
    const response = await Api.getInstance().get(`/symbol/${lelSymbolId}/${type}`);
    const data = response.data;
    return data.map((d: any) => new Semantic(d.id, d.name, d.type, d.description, d.createdAt, d.updatedAt));
}


export default {
    getFromSymbol,
};
