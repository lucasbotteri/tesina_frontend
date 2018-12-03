import Api from '@/api/Axios';
import Service from '@/interface/Service';
import LelSymbol from '@/model/LelSymbol';


export async function list(): Promise<LelSymbol[]> {
    const response = await Api.getInstance().get('/symbol/');
    const data = response.data.data;
    return data.map((d: any) => new LelSymbol(d.id, d.name, d.type, d.description, d.createdAt, d.updatedAt));
}

export async function get(lelSymbolId: string): Promise<LelSymbol> {
    const response = await Api.getInstance().get(`/symbol/${lelSymbolId}`);
    const data = response.data;
    return new LelSymbol(data.id, data.name, data.type, data.description, data.createdAt, data.updatedAt);
}

export async function save(lelSymbol: LelSymbol): Promise<LelSymbol> {
    const response = await Api.getInstance().post('/symbol/', {
        name: lelSymbol.name,
        description: lelSymbol.description,
        type: lelSymbol.type,
    });
    const data = response.data;
    return new LelSymbol(data.id, data.name, data.type, data.description, data.createdAt, data.updatedAt);
}

export async function remove(lelSymbolId: string): Promise<boolean> {
    const response = await Api.getInstance().delete(`/symbol/${lelSymbolId}`);
    const data = response.data;
    return true;
}


export default {
    list,
    get,
    save,
    remove,
};
