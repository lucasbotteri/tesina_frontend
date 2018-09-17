import Api from '@/api/Axios';
import { decode, setToken } from '@/helper/authentication';


export default class AccountService {

    public async login(username: string, password: string): Promise<string> {
        const payload = { username, password, strategy: 'jwt' };
        const response = await Api.getInstance().post('/authentication', payload);
        if (response.data.hasOwnProperty('accessToken')) {
            setToken(response.data.accessToken);
            return decode(response.data.data.accessToken);
        }
        return '';
    }
}
