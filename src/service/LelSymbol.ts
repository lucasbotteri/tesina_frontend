import Api from '@/api/Axios';
import Service from '@/interface/Service';
import LelSymbol from '@/model/LelSymbol';


export async function list(): Promise<LelSymbol[]> {
    const response = await Api.getInstance().get('/symbol/');
    const data = response.data.data;
    return data.map((d: any) => new LelSymbol(d.name, d.type));
}


export default {
    list,
};
