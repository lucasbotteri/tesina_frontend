import Api from '@/api/Axios';
import User from '@/model/User';
import Credential from '@/interface/Credential';


export async function list(): Promise<User[]> {
    const response = await Api.getInstance().get('/user/');
    const data = response.data.data;
    return data.map((d: any) => new User(d.id, d.email, d.type, d.createdAt, d.updatedAt));
}

export async function get(userId: string): Promise<User> {
    const response = await Api.getInstance().get(`/user/${userId}`);
    const data = response.data;
    return new User(data.id, data.email, data.type, data.createdAt, data.updatedAt);
}

export async function save(credential: Credential, type: string): Promise<User> {
    const response = await Api.getInstance().post('/user/', {
        email: credential.email,
        password: credential.password,
        type,
    });
    const data = response.data;
    return new User(data.id, data.email, data.type, data.createdAt, data.updatedAt);
}

export async function remove(userId: string): Promise<boolean> {
    const response = await Api.getInstance().delete(`/user/${userId}`);
    const data = response.data;
    return true;
}


export default {
    list,
    get,
    save,
    remove,
};
