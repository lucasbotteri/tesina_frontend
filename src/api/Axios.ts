import { AxiosInstance } from 'axios';
import Axios from 'axios';
import { isLoggedIn, getToken, removeToken } from '@/helper/authentication';
const BASE_URL = 'http://localhost:3030/';
export default class API {

    public static getInstance(): AxiosInstance {
        if (this.client === undefined) {
            this.client = Axios.create({
                baseURL: BASE_URL,
                withCredentials: false,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            this.client.interceptors.response.use((response) => {
                return response;
            }, (error) => {
                if (error.response.data.code === 401 && error.response.data.name === 'TokenExpiredError') {
                    removeToken();
                } else {
                    return Promise.reject(error);
                }
            });
        }
        if (isLoggedIn()) {
            this.client.defaults.headers.Authorization = getToken();
        }
        return this.client;
    }

    private static client: AxiosInstance;
}
