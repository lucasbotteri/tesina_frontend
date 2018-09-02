import Api from '@/Api/Axios';
import Service from '@/interface/Service';
import LelSymbol from '@/model/LelSymbol';
import { injectable } from 'inversify';
import API from '@/Api/Axios';



@injectable()
export default class SymbolService implements Service<LelSymbol> {

    public async list(): Promise<LelSymbol[]> {
        const response = await API.getInstance().get('/symbol/');
        const data = response.data.data;
        return data.map((d: any) => new LelSymbol(d.name, d.type));
    }
}
