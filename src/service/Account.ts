import Api from '@/api/Axios';
import Credential from '@/interface/Credential';


export async function login(credential: Credential): Promise<string> {
    const payload = { email: credential.email, password: credential.password, strategy: 'local' };
    const response = await Api.getInstance().post('/authentication', payload);
    if (response.data.hasOwnProperty('accessToken')) {
        return response.data.accessToken;
    }
    return '';
}

export default {
    login,
};
