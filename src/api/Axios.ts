import { AxiosInstance } from 'axios';
import Axios from 'axios';
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
        }
        return this.client;
    }

    private static client: AxiosInstance;
}
